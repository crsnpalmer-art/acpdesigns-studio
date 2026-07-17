"use client";

import { useEffect, useRef } from "react";
import styles from "./FieldManual.module.css";

type GPUBufferLike = { destroy?: () => void };

type GPUDeviceLike = {
  createShaderModule: (descriptor: { code: string }) => unknown;
  createRenderPipeline: (descriptor: Record<string, unknown>) => {
    getBindGroupLayout: (index: number) => unknown;
  };
  createBuffer: (descriptor: { size: number; usage: number }) => GPUBufferLike;
  createBindGroup: (descriptor: Record<string, unknown>) => unknown;
  createCommandEncoder: () => {
    beginRenderPass: (descriptor: Record<string, unknown>) => {
      setPipeline: (pipeline: unknown) => void;
      setBindGroup: (index: number, group: unknown) => void;
      draw: (vertexCount: number) => void;
      end: () => void;
    };
    finish: () => unknown;
  };
  queue: {
    writeBuffer: (buffer: GPUBufferLike, offset: number, data: ArrayBufferView) => void;
    submit: (commands: unknown[]) => void;
  };
  destroy?: () => void;
};

type GPUCanvasContextLike = {
  configure: (descriptor: Record<string, unknown>) => void;
  getCurrentTexture: () => { createView: () => unknown };
};

type GPULike = {
  requestAdapter: (options?: Record<string, unknown>) => Promise<{
    requestDevice: () => Promise<GPUDeviceLike>;
  } | null>;
  getPreferredCanvasFormat: () => string;
};

const wgsl = /* wgsl */ `
struct Uniforms {
  resolution: vec2f,
  pointer: vec2f,
  time: f32,
  motion: f32,
  pad: vec2f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex
fn vertexMain(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
  var positions = array<vec2f, 3>(
    vec2f(-1.0, -1.0),
    vec2f(3.0, -1.0),
    vec2f(-1.0, 3.0)
  );
  return vec4f(positions[index], 0.0, 1.0);
}

fn line(value: f32, width: f32) -> f32 {
  return 1.0 - smoothstep(0.0, width, abs(value));
}

@fragment
fn fragmentMain(@builtin(position) frag: vec4f) -> @location(0) vec4f {
  let uv = frag.xy / uniforms.resolution;
  let aspect = uniforms.resolution.x / uniforms.resolution.y;
  var p = vec2f((uv.x - 0.5) * aspect, uv.y - 0.5);
  let pointer = vec2f((uniforms.pointer.x - 0.5) * aspect, uniforms.pointer.y - 0.5);
  p += (pointer - p) * 0.018;

  let t = uniforms.time * uniforms.motion;
  let waveA = p.y + sin(p.x * 9.0 + t * 0.35) * 0.035;
  let waveB = p.y - 0.16 + sin(p.x * 13.0 - t * 0.22) * 0.022;
  let waveC = p.y + 0.19 + sin(p.x * 7.0 + t * 0.18) * 0.028;
  let routes = line(waveA, 0.0022) + line(waveB, 0.0015) + line(waveC, 0.0012);

  let gridX = line(fract((p.x + 1.0) * 18.0) - 0.5, 0.022);
  let gridY = line(fract((p.y + 1.0) * 18.0) - 0.5, 0.022);
  let grid = (gridX + gridY) * 0.11;

  let radius = distance(p, vec2f(0.18, -0.04));
  let ring = line(fract(radius * 8.0 - t * 0.025) - 0.5, 0.022) * 0.16;
  let orange = vec3f(0.95, 0.24, 0.035);
  let blue = vec3f(0.02, 0.23, 0.55);
  let color = mix(blue, orange, smoothstep(0.55, 1.05, uv.x));
  let alpha = clamp(routes * 0.46 + grid + ring, 0.0, 0.32);
  return vec4f(color * alpha, alpha);
}
`;

const vertexShader = /* glsl */ `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragmentShader = /* glsl */ `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float time;
uniform float motion;
out vec4 outColor;

float line(float value, float width) {
  return 1.0 - smoothstep(0.0, width, abs(value));
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float aspect = resolution.x / resolution.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 cursor = vec2((pointer.x - 0.5) * aspect, pointer.y - 0.5);
  p += (cursor - p) * 0.018;
  float t = time * motion;
  float a = line(p.y + sin(p.x * 9.0 + t * 0.35) * 0.035, 0.0022);
  float b = line(p.y - 0.16 + sin(p.x * 13.0 - t * 0.22) * 0.022, 0.0015);
  float c = line(p.y + 0.19 + sin(p.x * 7.0 + t * 0.18) * 0.028, 0.0012);
  float grid = (line(fract((p.x + 1.0) * 18.0) - 0.5, 0.022) + line(fract((p.y + 1.0) * 18.0) - 0.5, 0.022)) * 0.11;
  float ring = line(fract(distance(p, vec2(0.18, -0.04)) * 8.0 - t * 0.025) - 0.5, 0.022) * 0.16;
  vec3 color = mix(vec3(0.02, 0.23, 0.55), vec3(0.95, 0.24, 0.035), smoothstep(0.55, 1.05, uv.x));
  float alpha = clamp((a + b + c) * 0.46 + grid + ring, 0.0, 0.32);
  outColor = vec4(color * alpha, alpha);
}
`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function SystemField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frame = 0;
    let stopped = false;
    let cleanupRenderer = () => undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0.72, y: 0.38 };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.max(1, Math.floor(rect.width * scale));
      canvas.height = Math.max(1, Math.floor(rect.height * scale));
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = 1 - (event.clientY - rect.top) / rect.height;
    };

    const startWebGPU = async () => {
      const gpu = (navigator as Navigator & { gpu?: GPULike }).gpu;
      if (!gpu) return false;
      const adapter = await gpu.requestAdapter({ powerPreference: "high-performance" });
      if (!adapter || stopped) return false;
      const device = await adapter.requestDevice();
      const context = (
        canvas.getContext as unknown as (id: string) => unknown
      )("webgpu") as GPUCanvasContextLike | null;
      if (!context) return false;

      const format = gpu.getPreferredCanvasFormat();
      context.configure({ device, format, alphaMode: "premultiplied" });
      const shaderModule = device.createShaderModule({ code: wgsl });
      const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: { module: shaderModule, entryPoint: "vertexMain" },
        fragment: {
          module: shaderModule,
          entryPoint: "fragmentMain",
          targets: [
            {
              format,
              blend: {
                color: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
                alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
              },
            },
          ],
        },
        primitive: { topology: "triangle-list" },
      });
      const uniformBuffer = device.createBuffer({ size: 32, usage: 0x40 | 0x08 });
      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
      });

      const start = performance.now();
      const render = (now: number) => {
        if (stopped) return;
        resizeCanvas();
        const values = new Float32Array([
          canvas.width,
          canvas.height,
          pointer.x,
          pointer.y,
          (now - start) / 1000,
          reducedMotion.matches ? 0 : 1,
          0,
          0,
        ]);
        device.queue.writeBuffer(uniformBuffer, 0, values);
        const encoder = device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
          colorAttachments: [
            {
              view: context.getCurrentTexture().createView(),
              clearValue: { r: 0, g: 0, b: 0, a: 0 },
              loadOp: "clear",
              storeOp: "store",
            },
          ],
        });
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindGroup);
        pass.draw(3);
        pass.end();
        device.queue.submit([encoder.finish()]);
        if (!reducedMotion.matches) frame = requestAnimationFrame(render);
      };
      frame = requestAnimationFrame(render);
      cleanupRenderer = () => {
        uniformBuffer.destroy?.();
        device.destroy?.();
      };
      canvas.dataset.renderer = "webgpu";
      return true;
    };

    const startWebGL = () => {
      const gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
      });
      if (!gl) return;
      const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
      const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
      if (!vertex || !fragment) return;
      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

      const position = gl.getAttribLocation(program, "position");
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.useProgram(program);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      const resolution = gl.getUniformLocation(program, "resolution");
      const pointerUniform = gl.getUniformLocation(program, "pointer");
      const time = gl.getUniformLocation(program, "time");
      const motion = gl.getUniformLocation(program, "motion");
      const start = performance.now();

      const render = (now: number) => {
        if (stopped) return;
        resizeCanvas();
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(resolution, canvas.width, canvas.height);
        gl.uniform2f(pointerUniform, pointer.x, pointer.y);
        gl.uniform1f(time, (now - start) / 1000);
        gl.uniform1f(motion, reducedMotion.matches ? 0 : 1);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (!reducedMotion.matches) frame = requestAnimationFrame(render);
      };
      frame = requestAnimationFrame(render);
      cleanupRenderer = () => {
        if (buffer) gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
      };
      canvas.dataset.renderer = "webgl2";
    };

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    void startWebGPU().then((started) => {
      if (!started && !stopped) startWebGL();
    });

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      cleanupRenderer();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.systemField} aria-hidden="true" />;
}
