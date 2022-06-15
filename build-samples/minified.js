var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React;
var init_react = __esm({
  "node_modules/@remix-run/dev/compiler/shims/react.ts"() {
    React = __toESM(require("react"));
  }
});

// node_modules/three-mesh-bvh/build/index.umd.cjs
var require_index_umd = __commonJS({
  "node_modules/three-mesh-bvh/build/index.umd.cjs"(exports, module2) {
    init_react();
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require("three")) : typeof define === "function" && define.amd ? define(["exports", "three"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.MeshBVHLib = global.MeshBVHLib || {}, global.THREE));
    })(exports, function(exports2, three) {
      "use strict";
      const CENTER = 0;
      const AVERAGE = 1;
      const SAH = 2;
      const NOT_INTERSECTED = 0;
      const INTERSECTED = 1;
      const CONTAINED = 2;
      const TRIANGLE_INTERSECT_COST = 1.25;
      const TRAVERSAL_COST = 1;
      const BYTES_PER_NODE = 6 * 4 + 4 + 4;
      const IS_LEAFNODE_FLAG = 65535;
      const FLOAT32_EPSILON = Math.pow(2, -24);
      class MeshBVHNode {
        constructor() {
        }
      }
      function arrayToBox(nodeIndex32, array, target) {
        target.min.x = array[nodeIndex32];
        target.min.y = array[nodeIndex32 + 1];
        target.min.z = array[nodeIndex32 + 2];
        target.max.x = array[nodeIndex32 + 3];
        target.max.y = array[nodeIndex32 + 4];
        target.max.z = array[nodeIndex32 + 5];
        return target;
      }
      function getLongestEdgeIndex(bounds) {
        let splitDimIdx = -1;
        let splitDist = -Infinity;
        for (let i = 0; i < 3; i++) {
          const dist = bounds[i + 3] - bounds[i];
          if (dist > splitDist) {
            splitDist = dist;
            splitDimIdx = i;
          }
        }
        return splitDimIdx;
      }
      function copyBounds(source, target) {
        target.set(source);
      }
      function unionBounds(a, b, target) {
        let aVal, bVal;
        for (let d = 0; d < 3; d++) {
          const d3 = d + 3;
          aVal = a[d];
          bVal = b[d];
          target[d] = aVal < bVal ? aVal : bVal;
          aVal = a[d3];
          bVal = b[d3];
          target[d3] = aVal > bVal ? aVal : bVal;
        }
      }
      function expandByTriangleBounds(startIndex, triangleBounds, bounds) {
        for (let d = 0; d < 3; d++) {
          const tCenter = triangleBounds[startIndex + 2 * d];
          const tHalf = triangleBounds[startIndex + 2 * d + 1];
          const tMin = tCenter - tHalf;
          const tMax = tCenter + tHalf;
          if (tMin < bounds[d]) {
            bounds[d] = tMin;
          }
          if (tMax > bounds[d + 3]) {
            bounds[d + 3] = tMax;
          }
        }
      }
      function computeSurfaceArea(bounds) {
        const d0 = bounds[3] - bounds[0];
        const d1 = bounds[4] - bounds[1];
        const d2 = bounds[5] - bounds[2];
        return 2 * (d0 * d1 + d1 * d2 + d2 * d0);
      }
      function ensureIndex(geo, options) {
        if (!geo.index) {
          const vertexCount = geo.attributes.position.count;
          const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
          let index;
          if (vertexCount > 65535) {
            index = new Uint32Array(new BufferConstructor(4 * vertexCount));
          } else {
            index = new Uint16Array(new BufferConstructor(2 * vertexCount));
          }
          geo.setIndex(new three.BufferAttribute(index, 1));
          for (let i = 0; i < vertexCount; i++) {
            index[i] = i;
          }
        }
      }
      function getRootIndexRanges(geo) {
        if (!geo.groups || !geo.groups.length) {
          return [{ offset: 0, count: geo.index.count / 3 }];
        }
        const ranges = [];
        const rangeBoundaries = /* @__PURE__ */ new Set();
        for (const group of geo.groups) {
          rangeBoundaries.add(group.start);
          rangeBoundaries.add(group.start + group.count);
        }
        const sortedBoundaries = Array.from(rangeBoundaries.values()).sort((a, b) => a - b);
        for (let i = 0; i < sortedBoundaries.length - 1; i++) {
          const start = sortedBoundaries[i], end = sortedBoundaries[i + 1];
          ranges.push({ offset: start / 3, count: (end - start) / 3 });
        }
        return ranges;
      }
      function getBounds(triangleBounds, offset, count, target, centroidTarget = null) {
        let minx = Infinity;
        let miny = Infinity;
        let minz = Infinity;
        let maxx = -Infinity;
        let maxy = -Infinity;
        let maxz = -Infinity;
        let cminx = Infinity;
        let cminy = Infinity;
        let cminz = Infinity;
        let cmaxx = -Infinity;
        let cmaxy = -Infinity;
        let cmaxz = -Infinity;
        const includeCentroid = centroidTarget !== null;
        for (let i = offset * 6, end = (offset + count) * 6; i < end; i += 6) {
          const cx = triangleBounds[i + 0];
          const hx = triangleBounds[i + 1];
          const lx = cx - hx;
          const rx = cx + hx;
          if (lx < minx)
            minx = lx;
          if (rx > maxx)
            maxx = rx;
          if (includeCentroid && cx < cminx)
            cminx = cx;
          if (includeCentroid && cx > cmaxx)
            cmaxx = cx;
          const cy = triangleBounds[i + 2];
          const hy = triangleBounds[i + 3];
          const ly = cy - hy;
          const ry = cy + hy;
          if (ly < miny)
            miny = ly;
          if (ry > maxy)
            maxy = ry;
          if (includeCentroid && cy < cminy)
            cminy = cy;
          if (includeCentroid && cy > cmaxy)
            cmaxy = cy;
          const cz = triangleBounds[i + 4];
          const hz = triangleBounds[i + 5];
          const lz = cz - hz;
          const rz = cz + hz;
          if (lz < minz)
            minz = lz;
          if (rz > maxz)
            maxz = rz;
          if (includeCentroid && cz < cminz)
            cminz = cz;
          if (includeCentroid && cz > cmaxz)
            cmaxz = cz;
        }
        target[0] = minx;
        target[1] = miny;
        target[2] = minz;
        target[3] = maxx;
        target[4] = maxy;
        target[5] = maxz;
        if (includeCentroid) {
          centroidTarget[0] = cminx;
          centroidTarget[1] = cminy;
          centroidTarget[2] = cminz;
          centroidTarget[3] = cmaxx;
          centroidTarget[4] = cmaxy;
          centroidTarget[5] = cmaxz;
        }
      }
      function getCentroidBounds(triangleBounds, offset, count, centroidTarget) {
        let cminx = Infinity;
        let cminy = Infinity;
        let cminz = Infinity;
        let cmaxx = -Infinity;
        let cmaxy = -Infinity;
        let cmaxz = -Infinity;
        for (let i = offset * 6, end = (offset + count) * 6; i < end; i += 6) {
          const cx = triangleBounds[i + 0];
          if (cx < cminx)
            cminx = cx;
          if (cx > cmaxx)
            cmaxx = cx;
          const cy = triangleBounds[i + 2];
          if (cy < cminy)
            cminy = cy;
          if (cy > cmaxy)
            cmaxy = cy;
          const cz = triangleBounds[i + 4];
          if (cz < cminz)
            cminz = cz;
          if (cz > cmaxz)
            cmaxz = cz;
        }
        centroidTarget[0] = cminx;
        centroidTarget[1] = cminy;
        centroidTarget[2] = cminz;
        centroidTarget[3] = cmaxx;
        centroidTarget[4] = cmaxy;
        centroidTarget[5] = cmaxz;
      }
      function partition(index, triangleBounds, offset, count, split) {
        let left = offset;
        let right = offset + count - 1;
        const pos = split.pos;
        const axisOffset = split.axis * 2;
        while (true) {
          while (left <= right && triangleBounds[left * 6 + axisOffset] < pos) {
            left++;
          }
          while (left <= right && triangleBounds[right * 6 + axisOffset] >= pos) {
            right--;
          }
          if (left < right) {
            for (let i = 0; i < 3; i++) {
              let t0 = index[left * 3 + i];
              index[left * 3 + i] = index[right * 3 + i];
              index[right * 3 + i] = t0;
              let t1 = triangleBounds[left * 6 + i * 2 + 0];
              triangleBounds[left * 6 + i * 2 + 0] = triangleBounds[right * 6 + i * 2 + 0];
              triangleBounds[right * 6 + i * 2 + 0] = t1;
              let t2 = triangleBounds[left * 6 + i * 2 + 1];
              triangleBounds[left * 6 + i * 2 + 1] = triangleBounds[right * 6 + i * 2 + 1];
              triangleBounds[right * 6 + i * 2 + 1] = t2;
            }
            left++;
            right--;
          } else {
            return left;
          }
        }
      }
      const BIN_COUNT = 32;
      const binsSort = (a, b) => a.candidate - b.candidate;
      const sahBins = new Array(BIN_COUNT).fill().map(() => {
        return {
          count: 0,
          bounds: new Float32Array(6),
          rightCacheBounds: new Float32Array(6),
          leftCacheBounds: new Float32Array(6),
          candidate: 0
        };
      });
      const leftBounds = new Float32Array(6);
      function getOptimalSplit(nodeBoundingData, centroidBoundingData, triangleBounds, offset, count, strategy) {
        let axis = -1;
        let pos = 0;
        if (strategy === CENTER) {
          axis = getLongestEdgeIndex(centroidBoundingData);
          if (axis !== -1) {
            pos = (centroidBoundingData[axis] + centroidBoundingData[axis + 3]) / 2;
          }
        } else if (strategy === AVERAGE) {
          axis = getLongestEdgeIndex(nodeBoundingData);
          if (axis !== -1) {
            pos = getAverage(triangleBounds, offset, count, axis);
          }
        } else if (strategy === SAH) {
          const rootSurfaceArea = computeSurfaceArea(nodeBoundingData);
          let bestCost = TRIANGLE_INTERSECT_COST * count;
          const cStart = offset * 6;
          const cEnd = (offset + count) * 6;
          for (let a = 0; a < 3; a++) {
            const axisLeft = centroidBoundingData[a];
            const axisRight = centroidBoundingData[a + 3];
            const axisLength = axisRight - axisLeft;
            const binWidth = axisLength / BIN_COUNT;
            if (count < BIN_COUNT / 4) {
              const truncatedBins = [...sahBins];
              truncatedBins.length = count;
              let b = 0;
              for (let c = cStart; c < cEnd; c += 6, b++) {
                const bin = truncatedBins[b];
                bin.candidate = triangleBounds[c + 2 * a];
                bin.count = 0;
                const {
                  bounds,
                  leftCacheBounds,
                  rightCacheBounds
                } = bin;
                for (let d = 0; d < 3; d++) {
                  rightCacheBounds[d] = Infinity;
                  rightCacheBounds[d + 3] = -Infinity;
                  leftCacheBounds[d] = Infinity;
                  leftCacheBounds[d + 3] = -Infinity;
                  bounds[d] = Infinity;
                  bounds[d + 3] = -Infinity;
                }
                expandByTriangleBounds(c, triangleBounds, bounds);
              }
              truncatedBins.sort(binsSort);
              let splitCount = count;
              for (let bi = 0; bi < splitCount; bi++) {
                const bin = truncatedBins[bi];
                while (bi + 1 < splitCount && truncatedBins[bi + 1].candidate === bin.candidate) {
                  truncatedBins.splice(bi + 1, 1);
                  splitCount--;
                }
              }
              for (let c = cStart; c < cEnd; c += 6) {
                const center = triangleBounds[c + 2 * a];
                for (let bi = 0; bi < splitCount; bi++) {
                  const bin = truncatedBins[bi];
                  if (center >= bin.candidate) {
                    expandByTriangleBounds(c, triangleBounds, bin.rightCacheBounds);
                  } else {
                    expandByTriangleBounds(c, triangleBounds, bin.leftCacheBounds);
                    bin.count++;
                  }
                }
              }
              for (let bi = 0; bi < splitCount; bi++) {
                const bin = truncatedBins[bi];
                const leftCount = bin.count;
                const rightCount = count - bin.count;
                const leftBounds2 = bin.leftCacheBounds;
                const rightBounds = bin.rightCacheBounds;
                let leftProb = 0;
                if (leftCount !== 0) {
                  leftProb = computeSurfaceArea(leftBounds2) / rootSurfaceArea;
                }
                let rightProb = 0;
                if (rightCount !== 0) {
                  rightProb = computeSurfaceArea(rightBounds) / rootSurfaceArea;
                }
                const cost = TRAVERSAL_COST + TRIANGLE_INTERSECT_COST * (leftProb * leftCount + rightProb * rightCount);
                if (cost < bestCost) {
                  axis = a;
                  bestCost = cost;
                  pos = bin.candidate;
                }
              }
            } else {
              for (let i = 0; i < BIN_COUNT; i++) {
                const bin = sahBins[i];
                bin.count = 0;
                bin.candidate = axisLeft + binWidth + i * binWidth;
                const bounds = bin.bounds;
                for (let d = 0; d < 3; d++) {
                  bounds[d] = Infinity;
                  bounds[d + 3] = -Infinity;
                }
              }
              for (let c = cStart; c < cEnd; c += 6) {
                const triCenter = triangleBounds[c + 2 * a];
                const relativeCenter = triCenter - axisLeft;
                let binIndex = ~~(relativeCenter / binWidth);
                if (binIndex >= BIN_COUNT)
                  binIndex = BIN_COUNT - 1;
                const bin = sahBins[binIndex];
                bin.count++;
                expandByTriangleBounds(c, triangleBounds, bin.bounds);
              }
              const lastBin = sahBins[BIN_COUNT - 1];
              copyBounds(lastBin.bounds, lastBin.rightCacheBounds);
              for (let i = BIN_COUNT - 2; i >= 0; i--) {
                const bin = sahBins[i];
                const nextBin = sahBins[i + 1];
                unionBounds(bin.bounds, nextBin.rightCacheBounds, bin.rightCacheBounds);
              }
              let leftCount = 0;
              for (let i = 0; i < BIN_COUNT - 1; i++) {
                const bin = sahBins[i];
                const binCount = bin.count;
                const bounds = bin.bounds;
                const nextBin = sahBins[i + 1];
                const rightBounds = nextBin.rightCacheBounds;
                if (binCount !== 0) {
                  if (leftCount === 0) {
                    copyBounds(bounds, leftBounds);
                  } else {
                    unionBounds(bounds, leftBounds, leftBounds);
                  }
                }
                leftCount += binCount;
                let leftProb = 0;
                let rightProb = 0;
                if (leftCount !== 0) {
                  leftProb = computeSurfaceArea(leftBounds) / rootSurfaceArea;
                }
                const rightCount = count - leftCount;
                if (rightCount !== 0) {
                  rightProb = computeSurfaceArea(rightBounds) / rootSurfaceArea;
                }
                const cost = TRAVERSAL_COST + TRIANGLE_INTERSECT_COST * (leftProb * leftCount + rightProb * rightCount);
                if (cost < bestCost) {
                  axis = a;
                  bestCost = cost;
                  pos = bin.candidate;
                }
              }
            }
          }
        } else {
          console.warn(`MeshBVH: Invalid build strategy value ${strategy} used.`);
        }
        return { axis, pos };
      }
      function getAverage(triangleBounds, offset, count, axis) {
        let avg = 0;
        for (let i = offset, end = offset + count; i < end; i++) {
          avg += triangleBounds[i * 6 + axis * 2];
        }
        return avg / count;
      }
      function computeTriangleBounds(geo, fullBounds) {
        const posAttr = geo.attributes.position;
        const posArr = posAttr.array;
        const index = geo.index.array;
        const triCount = index.length / 3;
        const triangleBounds = new Float32Array(triCount * 6);
        const bufferOffset = posAttr.offset || 0;
        let stride = 3;
        if (posAttr.isInterleavedBufferAttribute) {
          stride = posAttr.data.stride;
        }
        for (let tri = 0; tri < triCount; tri++) {
          const tri3 = tri * 3;
          const tri6 = tri * 6;
          const ai = index[tri3 + 0] * stride + bufferOffset;
          const bi = index[tri3 + 1] * stride + bufferOffset;
          const ci = index[tri3 + 2] * stride + bufferOffset;
          for (let el = 0; el < 3; el++) {
            const a = posArr[ai + el];
            const b = posArr[bi + el];
            const c = posArr[ci + el];
            let min = a;
            if (b < min)
              min = b;
            if (c < min)
              min = c;
            let max = a;
            if (b > max)
              max = b;
            if (c > max)
              max = c;
            const halfExtents = (max - min) / 2;
            const el2 = el * 2;
            triangleBounds[tri6 + el2 + 0] = min + halfExtents;
            triangleBounds[tri6 + el2 + 1] = halfExtents + (Math.abs(min) + halfExtents) * FLOAT32_EPSILON;
            if (min < fullBounds[el])
              fullBounds[el] = min;
            if (max > fullBounds[el + 3])
              fullBounds[el + 3] = max;
          }
        }
        return triangleBounds;
      }
      function buildTree(geo, options) {
        function triggerProgress(trianglesProcessed) {
          if (onProgress) {
            onProgress(trianglesProcessed / totalTriangles);
          }
        }
        function splitNode(node, offset, count, centroidBoundingData = null, depth = 0) {
          if (!reachedMaxDepth && depth >= maxDepth) {
            reachedMaxDepth = true;
            if (verbose) {
              console.warn(`MeshBVH: Max depth of ${maxDepth} reached when generating BVH. Consider increasing maxDepth.`);
              console.warn(geo);
            }
          }
          if (count <= maxLeafTris || depth >= maxDepth) {
            triggerProgress(offset + count);
            node.offset = offset;
            node.count = count;
            return node;
          }
          const split = getOptimalSplit(node.boundingData, centroidBoundingData, triangleBounds, offset, count, strategy);
          if (split.axis === -1) {
            triggerProgress(offset + count);
            node.offset = offset;
            node.count = count;
            return node;
          }
          const splitOffset = partition(indexArray, triangleBounds, offset, count, split);
          if (splitOffset === offset || splitOffset === offset + count) {
            triggerProgress(offset + count);
            node.offset = offset;
            node.count = count;
          } else {
            node.splitAxis = split.axis;
            const left = new MeshBVHNode();
            const lstart = offset;
            const lcount = splitOffset - offset;
            node.left = left;
            left.boundingData = new Float32Array(6);
            getBounds(triangleBounds, lstart, lcount, left.boundingData, cacheCentroidBoundingData);
            splitNode(left, lstart, lcount, cacheCentroidBoundingData, depth + 1);
            const right = new MeshBVHNode();
            const rstart = splitOffset;
            const rcount = count - lcount;
            node.right = right;
            right.boundingData = new Float32Array(6);
            getBounds(triangleBounds, rstart, rcount, right.boundingData, cacheCentroidBoundingData);
            splitNode(right, rstart, rcount, cacheCentroidBoundingData, depth + 1);
          }
          return node;
        }
        ensureIndex(geo, options);
        const fullBounds = new Float32Array(6);
        const cacheCentroidBoundingData = new Float32Array(6);
        const triangleBounds = computeTriangleBounds(geo, fullBounds);
        const indexArray = geo.index.array;
        const maxDepth = options.maxDepth;
        const verbose = options.verbose;
        const maxLeafTris = options.maxLeafTris;
        const strategy = options.strategy;
        const onProgress = options.onProgress;
        const totalTriangles = geo.index.count / 3;
        let reachedMaxDepth = false;
        const roots = [];
        const ranges = getRootIndexRanges(geo);
        if (ranges.length === 1) {
          const range = ranges[0];
          const root = new MeshBVHNode();
          root.boundingData = fullBounds;
          getCentroidBounds(triangleBounds, range.offset, range.count, cacheCentroidBoundingData);
          splitNode(root, range.offset, range.count, cacheCentroidBoundingData);
          roots.push(root);
        } else {
          for (let range of ranges) {
            const root = new MeshBVHNode();
            root.boundingData = new Float32Array(6);
            getBounds(triangleBounds, range.offset, range.count, root.boundingData, cacheCentroidBoundingData);
            splitNode(root, range.offset, range.count, cacheCentroidBoundingData);
            roots.push(root);
          }
        }
        return roots;
      }
      function buildPackedTree(geo, options) {
        const roots = buildTree(geo, options);
        let float32Array;
        let uint32Array;
        let uint16Array;
        const packedRoots = [];
        const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
        for (let i = 0; i < roots.length; i++) {
          const root = roots[i];
          let nodeCount = countNodes(root);
          const buffer = new BufferConstructor(BYTES_PER_NODE * nodeCount);
          float32Array = new Float32Array(buffer);
          uint32Array = new Uint32Array(buffer);
          uint16Array = new Uint16Array(buffer);
          populateBuffer(0, root);
          packedRoots.push(buffer);
        }
        return packedRoots;
        function countNodes(node) {
          if (node.count) {
            return 1;
          } else {
            return 1 + countNodes(node.left) + countNodes(node.right);
          }
        }
        function populateBuffer(byteOffset, node) {
          const stride4Offset = byteOffset / 4;
          const stride2Offset = byteOffset / 2;
          const isLeaf = !!node.count;
          const boundingData = node.boundingData;
          for (let i = 0; i < 6; i++) {
            float32Array[stride4Offset + i] = boundingData[i];
          }
          if (isLeaf) {
            const offset = node.offset;
            const count = node.count;
            uint32Array[stride4Offset + 6] = offset;
            uint16Array[stride2Offset + 14] = count;
            uint16Array[stride2Offset + 15] = IS_LEAFNODE_FLAG;
            return byteOffset + BYTES_PER_NODE;
          } else {
            const left = node.left;
            const right = node.right;
            const splitAxis = node.splitAxis;
            let nextUnusedPointer;
            nextUnusedPointer = populateBuffer(byteOffset + BYTES_PER_NODE, left);
            if (nextUnusedPointer / 4 > Math.pow(2, 32)) {
              throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");
            }
            uint32Array[stride4Offset + 6] = nextUnusedPointer / 4;
            nextUnusedPointer = populateBuffer(nextUnusedPointer, right);
            uint32Array[stride4Offset + 7] = splitAxis;
            return nextUnusedPointer;
          }
        }
      }
      class SeparatingAxisBounds {
        constructor() {
          this.min = Infinity;
          this.max = -Infinity;
        }
        setFromPointsField(points, field) {
          let min = Infinity;
          let max = -Infinity;
          for (let i = 0, l = points.length; i < l; i++) {
            const p = points[i];
            const val = p[field];
            min = val < min ? val : min;
            max = val > max ? val : max;
          }
          this.min = min;
          this.max = max;
        }
        setFromPoints(axis, points) {
          let min = Infinity;
          let max = -Infinity;
          for (let i = 0, l = points.length; i < l; i++) {
            const p = points[i];
            const val = axis.dot(p);
            min = val < min ? val : min;
            max = val > max ? val : max;
          }
          this.min = min;
          this.max = max;
        }
        isSeparated(other) {
          return this.min > other.max || other.min > this.max;
        }
      }
      SeparatingAxisBounds.prototype.setFromBox = function() {
        const p = new three.Vector3();
        return function setFromBox(axis, box) {
          const boxMin = box.min;
          const boxMax = box.max;
          let min = Infinity;
          let max = -Infinity;
          for (let x = 0; x <= 1; x++) {
            for (let y = 0; y <= 1; y++) {
              for (let z = 0; z <= 1; z++) {
                p.x = boxMin.x * x + boxMax.x * (1 - x);
                p.y = boxMin.y * y + boxMax.y * (1 - y);
                p.z = boxMin.z * z + boxMax.z * (1 - z);
                const val = axis.dot(p);
                min = Math.min(val, min);
                max = Math.max(val, max);
              }
            }
          }
          this.min = min;
          this.max = max;
        };
      }();
      const areIntersecting = function() {
        const cacheSatBounds = new SeparatingAxisBounds();
        return function areIntersecting2(shape1, shape2) {
          const points1 = shape1.points;
          const satAxes1 = shape1.satAxes;
          const satBounds1 = shape1.satBounds;
          const points2 = shape2.points;
          const satAxes2 = shape2.satAxes;
          const satBounds2 = shape2.satBounds;
          for (let i = 0; i < 3; i++) {
            const sb = satBounds1[i];
            const sa = satAxes1[i];
            cacheSatBounds.setFromPoints(sa, points2);
            if (sb.isSeparated(cacheSatBounds))
              return false;
          }
          for (let i = 0; i < 3; i++) {
            const sb = satBounds2[i];
            const sa = satAxes2[i];
            cacheSatBounds.setFromPoints(sa, points1);
            if (sb.isSeparated(cacheSatBounds))
              return false;
          }
        };
      }();
      const closestPointLineToLine = function() {
        const dir1 = new three.Vector3();
        const dir2 = new three.Vector3();
        const v02 = new three.Vector3();
        return function closestPointLineToLine2(l1, l2, result) {
          const v0 = l1.start;
          const v10 = dir1;
          const v2 = l2.start;
          const v32 = dir2;
          v02.subVectors(v0, v2);
          dir1.subVectors(l1.end, l2.start);
          dir2.subVectors(l2.end, l2.start);
          const d0232 = v02.dot(v32);
          const d3210 = v32.dot(v10);
          const d3232 = v32.dot(v32);
          const d0210 = v02.dot(v10);
          const d1010 = v10.dot(v10);
          const denom = d1010 * d3232 - d3210 * d3210;
          let d, d2;
          if (denom !== 0) {
            d = (d0232 * d3210 - d0210 * d3232) / denom;
          } else {
            d = 0;
          }
          d2 = (d0232 + d * d3210) / d3232;
          result.x = d;
          result.y = d2;
        };
      }();
      const closestPointsSegmentToSegment = function() {
        const paramResult = new three.Vector2();
        const temp12 = new three.Vector3();
        const temp22 = new three.Vector3();
        return function closestPointsSegmentToSegment2(l1, l2, target1, target2) {
          closestPointLineToLine(l1, l2, paramResult);
          let d = paramResult.x;
          let d2 = paramResult.y;
          if (d >= 0 && d <= 1 && d2 >= 0 && d2 <= 1) {
            l1.at(d, target1);
            l2.at(d2, target2);
            return;
          } else if (d >= 0 && d <= 1) {
            if (d2 < 0) {
              l2.at(0, target2);
            } else {
              l2.at(1, target2);
            }
            l1.closestPointToPoint(target2, true, target1);
            return;
          } else if (d2 >= 0 && d2 <= 1) {
            if (d < 0) {
              l1.at(0, target1);
            } else {
              l1.at(1, target1);
            }
            l2.closestPointToPoint(target1, true, target2);
            return;
          } else {
            let p;
            if (d < 0) {
              p = l1.start;
            } else {
              p = l1.end;
            }
            let p2;
            if (d2 < 0) {
              p2 = l2.start;
            } else {
              p2 = l2.end;
            }
            const closestPoint = temp12;
            const closestPoint2 = temp22;
            l1.closestPointToPoint(p2, true, temp12);
            l2.closestPointToPoint(p, true, temp22);
            if (closestPoint.distanceToSquared(p2) <= closestPoint2.distanceToSquared(p)) {
              target1.copy(closestPoint);
              target2.copy(p2);
              return;
            } else {
              target1.copy(p);
              target2.copy(closestPoint2);
              return;
            }
          }
        };
      }();
      const sphereIntersectTriangle = function() {
        const closestPointTemp = new three.Vector3();
        const projectedPointTemp = new three.Vector3();
        const planeTemp = new three.Plane();
        const lineTemp = new three.Line3();
        return function sphereIntersectTriangle2(sphere, triangle) {
          const { radius, center } = sphere;
          const { a, b, c } = triangle;
          lineTemp.start = a;
          lineTemp.end = b;
          const closestPoint1 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
          if (closestPoint1.distanceTo(center) <= radius)
            return true;
          lineTemp.start = a;
          lineTemp.end = c;
          const closestPoint2 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
          if (closestPoint2.distanceTo(center) <= radius)
            return true;
          lineTemp.start = b;
          lineTemp.end = c;
          const closestPoint3 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
          if (closestPoint3.distanceTo(center) <= radius)
            return true;
          const plane = triangle.getPlane(planeTemp);
          const dp = Math.abs(plane.distanceToPoint(center));
          if (dp <= radius) {
            const pp = plane.projectPoint(center, projectedPointTemp);
            const cp = triangle.containsPoint(pp);
            if (cp)
              return true;
          }
          return false;
        };
      }();
      class ExtendedTriangle extends three.Triangle {
        constructor(...args) {
          super(...args);
          this.isExtendedTriangle = true;
          this.satAxes = new Array(4).fill().map(() => new three.Vector3());
          this.satBounds = new Array(4).fill().map(() => new SeparatingAxisBounds());
          this.points = [this.a, this.b, this.c];
          this.sphere = new three.Sphere();
          this.plane = new three.Plane();
          this.needsUpdate = false;
        }
        intersectsSphere(sphere) {
          return sphereIntersectTriangle(sphere, this);
        }
        update() {
          const a = this.a;
          const b = this.b;
          const c = this.c;
          const points = this.points;
          const satAxes = this.satAxes;
          const satBounds = this.satBounds;
          const axis0 = satAxes[0];
          const sab0 = satBounds[0];
          this.getNormal(axis0);
          sab0.setFromPoints(axis0, points);
          const axis1 = satAxes[1];
          const sab1 = satBounds[1];
          axis1.subVectors(a, b);
          sab1.setFromPoints(axis1, points);
          const axis2 = satAxes[2];
          const sab2 = satBounds[2];
          axis2.subVectors(b, c);
          sab2.setFromPoints(axis2, points);
          const axis3 = satAxes[3];
          const sab3 = satBounds[3];
          axis3.subVectors(c, a);
          sab3.setFromPoints(axis3, points);
          this.sphere.setFromPoints(this.points);
          this.plane.setFromNormalAndCoplanarPoint(axis0, a);
          this.needsUpdate = false;
        }
      }
      ExtendedTriangle.prototype.closestPointToSegment = function() {
        const point1 = new three.Vector3();
        const point2 = new three.Vector3();
        const edge = new three.Line3();
        return function distanceToSegment(segment, target1 = null, target2 = null) {
          const { start, end } = segment;
          const points = this.points;
          let distSq;
          let closestDistanceSq = Infinity;
          for (let i = 0; i < 3; i++) {
            const nexti = (i + 1) % 3;
            edge.start.copy(points[i]);
            edge.end.copy(points[nexti]);
            closestPointsSegmentToSegment(edge, segment, point1, point2);
            distSq = point1.distanceToSquared(point2);
            if (distSq < closestDistanceSq) {
              closestDistanceSq = distSq;
              if (target1)
                target1.copy(point1);
              if (target2)
                target2.copy(point2);
            }
          }
          this.closestPointToPoint(start, point1);
          distSq = start.distanceToSquared(point1);
          if (distSq < closestDistanceSq) {
            closestDistanceSq = distSq;
            if (target1)
              target1.copy(point1);
            if (target2)
              target2.copy(start);
          }
          this.closestPointToPoint(end, point1);
          distSq = end.distanceToSquared(point1);
          if (distSq < closestDistanceSq) {
            closestDistanceSq = distSq;
            if (target1)
              target1.copy(point1);
            if (target2)
              target2.copy(end);
          }
          return Math.sqrt(closestDistanceSq);
        };
      }();
      ExtendedTriangle.prototype.intersectsTriangle = function() {
        const saTri2 = new ExtendedTriangle();
        const arr1 = new Array(3);
        const arr2 = new Array(3);
        const cachedSatBounds = new SeparatingAxisBounds();
        const cachedSatBounds2 = new SeparatingAxisBounds();
        const cachedAxis = new three.Vector3();
        const dir1 = new three.Vector3();
        const dir2 = new three.Vector3();
        const tempDir = new three.Vector3();
        const edge = new three.Line3();
        const edge1 = new three.Line3();
        const edge2 = new three.Line3();
        return function intersectsTriangle(other, target = null) {
          if (this.needsUpdate) {
            this.update();
          }
          if (!other.isExtendedTriangle) {
            saTri2.copy(other);
            saTri2.update();
            other = saTri2;
          } else if (other.needsUpdate) {
            other.update();
          }
          const plane1 = this.plane;
          const plane2 = other.plane;
          if (Math.abs(plane1.normal.dot(plane2.normal)) > 1 - 1e-10) {
            const satBounds1 = this.satBounds;
            const satAxes1 = this.satAxes;
            arr2[0] = other.a;
            arr2[1] = other.b;
            arr2[2] = other.c;
            for (let i = 0; i < 4; i++) {
              const sb = satBounds1[i];
              const sa = satAxes1[i];
              cachedSatBounds.setFromPoints(sa, arr2);
              if (sb.isSeparated(cachedSatBounds))
                return false;
            }
            const satBounds2 = other.satBounds;
            const satAxes2 = other.satAxes;
            arr1[0] = this.a;
            arr1[1] = this.b;
            arr1[2] = this.c;
            for (let i = 0; i < 4; i++) {
              const sb = satBounds2[i];
              const sa = satAxes2[i];
              cachedSatBounds.setFromPoints(sa, arr1);
              if (sb.isSeparated(cachedSatBounds))
                return false;
            }
            for (let i = 0; i < 4; i++) {
              const sa1 = satAxes1[i];
              for (let i2 = 0; i2 < 4; i2++) {
                const sa2 = satAxes2[i2];
                cachedAxis.crossVectors(sa1, sa2);
                cachedSatBounds.setFromPoints(cachedAxis, arr1);
                cachedSatBounds2.setFromPoints(cachedAxis, arr2);
                if (cachedSatBounds.isSeparated(cachedSatBounds2))
                  return false;
              }
            }
            if (target) {
              console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.");
              target.start.set(0, 0, 0);
              target.end.set(0, 0, 0);
            }
            return true;
          } else {
            const points1 = this.points;
            let found1 = false;
            let count1 = 0;
            for (let i = 0; i < 3; i++) {
              const p1 = points1[i];
              const p2 = points1[(i + 1) % 3];
              edge.start.copy(p1);
              edge.end.copy(p2);
              edge.delta(dir1);
              if (plane2.normal.dot(dir1) === 0 && plane2.distanceToPoint(edge.start) === 0) {
                edge1.copy(edge);
                count1 = 2;
                break;
              } else if (plane2.intersectLine(edge, found1 ? edge1.start : edge1.end)) {
                count1++;
                if (found1) {
                  break;
                }
                found1 = true;
              }
            }
            if (count1 !== 2) {
              return false;
            }
            const points2 = other.points;
            let found2 = false;
            let count2 = 0;
            for (let i = 0; i < 3; i++) {
              const p1 = points2[i];
              const p2 = points2[(i + 1) % 3];
              edge.start.copy(p1);
              edge.end.copy(p2);
              edge.delta(dir2);
              if (plane1.normal.dot(dir2) === 0 && plane1.distanceToPoint(edge.start) === 0) {
                edge2.copy(edge);
                count2 = 2;
                break;
              } else if (plane1.intersectLine(edge, found2 ? edge2.start : edge2.end)) {
                count2++;
                if (found2) {
                  break;
                }
                found2 = true;
              }
            }
            if (count2 !== 2) {
              return false;
            }
            edge1.delta(dir1);
            edge2.delta(dir2);
            if (dir1.dot(dir2) < 0) {
              let tmp = edge2.start;
              edge2.start = edge2.end;
              edge2.end = tmp;
            }
            const s1 = edge1.start.dot(dir1);
            const e1 = edge1.end.dot(dir1);
            const s2 = edge2.start.dot(dir1);
            const e2 = edge2.end.dot(dir1);
            const separated1 = e1 < s2;
            const separated2 = s1 < e2;
            if (s1 !== e2 && s2 !== e1 && separated1 === separated2) {
              return false;
            }
            if (target) {
              tempDir.subVectors(edge1.start, edge2.start);
              if (tempDir.dot(dir1) > 0) {
                target.start.copy(edge1.start);
              } else {
                target.start.copy(edge2.start);
              }
              tempDir.subVectors(edge1.end, edge2.end);
              if (tempDir.dot(dir1) < 0) {
                target.end.copy(edge1.end);
              } else {
                target.end.copy(edge2.end);
              }
            }
            return true;
          }
        };
      }();
      ExtendedTriangle.prototype.distanceToPoint = function() {
        const target = new three.Vector3();
        return function distanceToPoint(point) {
          this.closestPointToPoint(point, target);
          return point.distanceTo(target);
        };
      }();
      ExtendedTriangle.prototype.distanceToTriangle = function() {
        const point = new three.Vector3();
        const point2 = new three.Vector3();
        const cornerFields = ["a", "b", "c"];
        const line1 = new three.Line3();
        const line2 = new three.Line3();
        return function distanceToTriangle(other, target1 = null, target2 = null) {
          const lineTarget = target1 || target2 ? line1 : null;
          if (this.intersectsTriangle(other, lineTarget)) {
            if (target1 || target2) {
              if (target1)
                lineTarget.getCenter(target1);
              if (target2)
                lineTarget.getCenter(target2);
            }
            return 0;
          }
          let closestDistanceSq = Infinity;
          for (let i = 0; i < 3; i++) {
            let dist;
            const field = cornerFields[i];
            const otherVec = other[field];
            this.closestPointToPoint(otherVec, point);
            dist = otherVec.distanceToSquared(point);
            if (dist < closestDistanceSq) {
              closestDistanceSq = dist;
              if (target1)
                target1.copy(point);
              if (target2)
                target2.copy(otherVec);
            }
            const thisVec = this[field];
            other.closestPointToPoint(thisVec, point);
            dist = thisVec.distanceToSquared(point);
            if (dist < closestDistanceSq) {
              closestDistanceSq = dist;
              if (target1)
                target1.copy(thisVec);
              if (target2)
                target2.copy(point);
            }
          }
          for (let i = 0; i < 3; i++) {
            const f11 = cornerFields[i];
            const f12 = cornerFields[(i + 1) % 3];
            line1.set(this[f11], this[f12]);
            for (let i2 = 0; i2 < 3; i2++) {
              const f21 = cornerFields[i2];
              const f22 = cornerFields[(i2 + 1) % 3];
              line2.set(other[f21], other[f22]);
              closestPointsSegmentToSegment(line1, line2, point, point2);
              const dist = point.distanceToSquared(point2);
              if (dist < closestDistanceSq) {
                closestDistanceSq = dist;
                if (target1)
                  target1.copy(point);
                if (target2)
                  target2.copy(point2);
              }
            }
          }
          return Math.sqrt(closestDistanceSq);
        };
      }();
      class OrientedBox extends three.Box3 {
        constructor(...args) {
          super(...args);
          this.isOrientedBox = true;
          this.matrix = new three.Matrix4();
          this.invMatrix = new three.Matrix4();
          this.points = new Array(8).fill().map(() => new three.Vector3());
          this.satAxes = new Array(3).fill().map(() => new three.Vector3());
          this.satBounds = new Array(3).fill().map(() => new SeparatingAxisBounds());
          this.alignedSatBounds = new Array(3).fill().map(() => new SeparatingAxisBounds());
          this.needsUpdate = false;
        }
        set(min, max, matrix) {
          super.set(min, max);
          this.matrix.copy(matrix);
          this.needsUpdate = true;
        }
        copy(other) {
          super.copy(other);
          this.matrix.copy(other.matrix);
          this.needsUpdate = true;
        }
      }
      OrientedBox.prototype.update = function() {
        return function update() {
          const matrix = this.matrix;
          const min = this.min;
          const max = this.max;
          const points = this.points;
          for (let x = 0; x <= 1; x++) {
            for (let y = 0; y <= 1; y++) {
              for (let z = 0; z <= 1; z++) {
                const i = (1 << 0) * x | (1 << 1) * y | (1 << 2) * z;
                const v = points[i];
                v.x = x ? max.x : min.x;
                v.y = y ? max.y : min.y;
                v.z = z ? max.z : min.z;
                v.applyMatrix4(matrix);
              }
            }
          }
          const satBounds = this.satBounds;
          const satAxes = this.satAxes;
          const minVec = points[0];
          for (let i = 0; i < 3; i++) {
            const axis = satAxes[i];
            const sb = satBounds[i];
            const index = 1 << i;
            const pi = points[index];
            axis.subVectors(minVec, pi);
            sb.setFromPoints(axis, points);
          }
          const alignedSatBounds = this.alignedSatBounds;
          alignedSatBounds[0].setFromPointsField(points, "x");
          alignedSatBounds[1].setFromPointsField(points, "y");
          alignedSatBounds[2].setFromPointsField(points, "z");
          this.invMatrix.copy(this.matrix).invert();
          this.needsUpdate = false;
        };
      }();
      OrientedBox.prototype.intersectsBox = function() {
        const aabbBounds = new SeparatingAxisBounds();
        return function intersectsBox(box) {
          if (this.needsUpdate) {
            this.update();
          }
          const min = box.min;
          const max = box.max;
          const satBounds = this.satBounds;
          const satAxes = this.satAxes;
          const alignedSatBounds = this.alignedSatBounds;
          aabbBounds.min = min.x;
          aabbBounds.max = max.x;
          if (alignedSatBounds[0].isSeparated(aabbBounds))
            return false;
          aabbBounds.min = min.y;
          aabbBounds.max = max.y;
          if (alignedSatBounds[1].isSeparated(aabbBounds))
            return false;
          aabbBounds.min = min.z;
          aabbBounds.max = max.z;
          if (alignedSatBounds[2].isSeparated(aabbBounds))
            return false;
          for (let i = 0; i < 3; i++) {
            const axis = satAxes[i];
            const sb = satBounds[i];
            aabbBounds.setFromBox(axis, box);
            if (sb.isSeparated(aabbBounds))
              return false;
          }
          return true;
        };
      }();
      OrientedBox.prototype.intersectsTriangle = function() {
        const saTri = new ExtendedTriangle();
        const pointsArr = new Array(3);
        const cachedSatBounds = new SeparatingAxisBounds();
        const cachedSatBounds2 = new SeparatingAxisBounds();
        const cachedAxis = new three.Vector3();
        return function intersectsTriangle(triangle) {
          if (this.needsUpdate) {
            this.update();
          }
          if (!triangle.isExtendedTriangle) {
            saTri.copy(triangle);
            saTri.update();
            triangle = saTri;
          } else if (triangle.needsUpdate) {
            triangle.update();
          }
          const satBounds = this.satBounds;
          const satAxes = this.satAxes;
          pointsArr[0] = triangle.a;
          pointsArr[1] = triangle.b;
          pointsArr[2] = triangle.c;
          for (let i = 0; i < 3; i++) {
            const sb = satBounds[i];
            const sa = satAxes[i];
            cachedSatBounds.setFromPoints(sa, pointsArr);
            if (sb.isSeparated(cachedSatBounds))
              return false;
          }
          const triSatBounds = triangle.satBounds;
          const triSatAxes = triangle.satAxes;
          const points = this.points;
          for (let i = 0; i < 3; i++) {
            const sb = triSatBounds[i];
            const sa = triSatAxes[i];
            cachedSatBounds.setFromPoints(sa, points);
            if (sb.isSeparated(cachedSatBounds))
              return false;
          }
          for (let i = 0; i < 3; i++) {
            const sa1 = satAxes[i];
            for (let i2 = 0; i2 < 4; i2++) {
              const sa2 = triSatAxes[i2];
              cachedAxis.crossVectors(sa1, sa2);
              cachedSatBounds.setFromPoints(cachedAxis, pointsArr);
              cachedSatBounds2.setFromPoints(cachedAxis, points);
              if (cachedSatBounds.isSeparated(cachedSatBounds2))
                return false;
            }
          }
          return true;
        };
      }();
      OrientedBox.prototype.closestPointToPoint = function() {
        return function closestPointToPoint(point, target1) {
          if (this.needsUpdate) {
            this.update();
          }
          target1.copy(point).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix);
          return target1;
        };
      }();
      OrientedBox.prototype.distanceToPoint = function() {
        const target = new three.Vector3();
        return function distanceToPoint(point) {
          this.closestPointToPoint(point, target);
          return point.distanceTo(target);
        };
      }();
      OrientedBox.prototype.distanceToBox = function() {
        const xyzFields2 = ["x", "y", "z"];
        const segments1 = new Array(12).fill().map(() => new three.Line3());
        const segments2 = new Array(12).fill().map(() => new three.Line3());
        const point1 = new three.Vector3();
        const point2 = new three.Vector3();
        return function distanceToBox(box, threshold = 0, target1 = null, target2 = null) {
          if (this.needsUpdate) {
            this.update();
          }
          if (this.intersectsBox(box)) {
            if (target1 || target2) {
              box.getCenter(point2);
              this.closestPointToPoint(point2, point1);
              box.closestPointToPoint(point1, point2);
              if (target1)
                target1.copy(point1);
              if (target2)
                target2.copy(point2);
            }
            return 0;
          }
          const threshold2 = threshold * threshold;
          const min = box.min;
          const max = box.max;
          const points = this.points;
          let closestDistanceSq = Infinity;
          for (let i = 0; i < 8; i++) {
            const p = points[i];
            point2.copy(p).clamp(min, max);
            const dist = p.distanceToSquared(point2);
            if (dist < closestDistanceSq) {
              closestDistanceSq = dist;
              if (target1)
                target1.copy(p);
              if (target2)
                target2.copy(point2);
              if (dist < threshold2)
                return Math.sqrt(dist);
            }
          }
          let count = 0;
          for (let i = 0; i < 3; i++) {
            for (let i1 = 0; i1 <= 1; i1++) {
              for (let i2 = 0; i2 <= 1; i2++) {
                const nextIndex = (i + 1) % 3;
                const nextIndex2 = (i + 2) % 3;
                const index = i1 << nextIndex | i2 << nextIndex2;
                const index2 = 1 << i | i1 << nextIndex | i2 << nextIndex2;
                const p1 = points[index];
                const p2 = points[index2];
                const line1 = segments1[count];
                line1.set(p1, p2);
                const f1 = xyzFields2[i];
                const f2 = xyzFields2[nextIndex];
                const f3 = xyzFields2[nextIndex2];
                const line2 = segments2[count];
                const start = line2.start;
                const end = line2.end;
                start[f1] = min[f1];
                start[f2] = i1 ? min[f2] : max[f2];
                start[f3] = i2 ? min[f3] : max[f2];
                end[f1] = max[f1];
                end[f2] = i1 ? min[f2] : max[f2];
                end[f3] = i2 ? min[f3] : max[f2];
                count++;
              }
            }
          }
          for (let x = 0; x <= 1; x++) {
            for (let y = 0; y <= 1; y++) {
              for (let z = 0; z <= 1; z++) {
                point2.x = x ? max.x : min.x;
                point2.y = y ? max.y : min.y;
                point2.z = z ? max.z : min.z;
                this.closestPointToPoint(point2, point1);
                const dist = point2.distanceToSquared(point1);
                if (dist < closestDistanceSq) {
                  closestDistanceSq = dist;
                  if (target1)
                    target1.copy(point1);
                  if (target2)
                    target2.copy(point2);
                  if (dist < threshold2)
                    return Math.sqrt(dist);
                }
              }
            }
          }
          for (let i = 0; i < 12; i++) {
            const l1 = segments1[i];
            for (let i2 = 0; i2 < 12; i2++) {
              const l2 = segments2[i2];
              closestPointsSegmentToSegment(l1, l2, point1, point2);
              const dist = point1.distanceToSquared(point2);
              if (dist < closestDistanceSq) {
                closestDistanceSq = dist;
                if (target1)
                  target1.copy(point1);
                if (target2)
                  target2.copy(point2);
                if (dist < threshold2)
                  return Math.sqrt(dist);
              }
            }
          }
          return Math.sqrt(closestDistanceSq);
        };
      }();
      const vA = /* @__PURE__ */ new three.Vector3();
      const vB = /* @__PURE__ */ new three.Vector3();
      const vC = /* @__PURE__ */ new three.Vector3();
      const uvA = /* @__PURE__ */ new three.Vector2();
      const uvB = /* @__PURE__ */ new three.Vector2();
      const uvC = /* @__PURE__ */ new three.Vector2();
      const intersectionPoint = /* @__PURE__ */ new three.Vector3();
      function checkIntersection(ray2, pA, pB, pC, point, side) {
        let intersect;
        if (side === three.BackSide) {
          intersect = ray2.intersectTriangle(pC, pB, pA, true, point);
        } else {
          intersect = ray2.intersectTriangle(pA, pB, pC, side !== three.DoubleSide, point);
        }
        if (intersect === null)
          return null;
        const distance = ray2.origin.distanceTo(point);
        return {
          distance,
          point: point.clone()
        };
      }
      function checkBufferGeometryIntersection(ray2, position, uv, a, b, c, side) {
        vA.fromBufferAttribute(position, a);
        vB.fromBufferAttribute(position, b);
        vC.fromBufferAttribute(position, c);
        const intersection = checkIntersection(ray2, vA, vB, vC, intersectionPoint, side);
        if (intersection) {
          if (uv) {
            uvA.fromBufferAttribute(uv, a);
            uvB.fromBufferAttribute(uv, b);
            uvC.fromBufferAttribute(uv, c);
            intersection.uv = three.Triangle.getUV(intersectionPoint, vA, vB, vC, uvA, uvB, uvC, new three.Vector2());
          }
          const face = {
            a,
            b,
            c,
            normal: new three.Vector3(),
            materialIndex: 0
          };
          three.Triangle.getNormal(vA, vB, vC, face.normal);
          intersection.face = face;
          intersection.faceIndex = a;
        }
        return intersection;
      }
      function intersectTri(geo, side, ray2, tri, intersections) {
        const triOffset = tri * 3;
        const a = geo.index.getX(triOffset);
        const b = geo.index.getX(triOffset + 1);
        const c = geo.index.getX(triOffset + 2);
        const intersection = checkBufferGeometryIntersection(ray2, geo.attributes.position, geo.attributes.uv, a, b, c, side);
        if (intersection) {
          intersection.faceIndex = tri;
          if (intersections)
            intersections.push(intersection);
          return intersection;
        }
        return null;
      }
      function intersectTris(geo, side, ray2, offset, count, intersections) {
        for (let i = offset, end = offset + count; i < end; i++) {
          intersectTri(geo, side, ray2, i, intersections);
        }
      }
      function intersectClosestTri(geo, side, ray2, offset, count) {
        let dist = Infinity;
        let res = null;
        for (let i = offset, end = offset + count; i < end; i++) {
          const intersection = intersectTri(geo, side, ray2, i);
          if (intersection && intersection.distance < dist) {
            res = intersection;
            dist = intersection.distance;
          }
        }
        return res;
      }
      function convertRaycastIntersect(hit, object, raycaster) {
        if (hit === null) {
          return null;
        }
        hit.point.applyMatrix4(object.matrixWorld);
        hit.distance = hit.point.distanceTo(raycaster.ray.origin);
        hit.object = object;
        if (hit.distance < raycaster.near || hit.distance > raycaster.far) {
          return null;
        } else {
          return hit;
        }
      }
      function setTriangle(tri, i, index, pos) {
        const ta = tri.a;
        const tb = tri.b;
        const tc = tri.c;
        let i0 = i;
        let i1 = i + 1;
        let i2 = i + 2;
        if (index) {
          i0 = index.getX(i);
          i1 = index.getX(i + 1);
          i2 = index.getX(i + 2);
        }
        ta.x = pos.getX(i0);
        ta.y = pos.getY(i0);
        ta.z = pos.getZ(i0);
        tb.x = pos.getX(i1);
        tb.y = pos.getY(i1);
        tb.z = pos.getZ(i1);
        tc.x = pos.getX(i2);
        tc.y = pos.getY(i2);
        tc.z = pos.getZ(i2);
      }
      function iterateOverTriangles(offset, count, geometry, intersectsTriangleFunc, contained, depth, triangle) {
        const index = geometry.index;
        const pos = geometry.attributes.position;
        for (let i = offset, l = count + offset; i < l; i++) {
          setTriangle(triangle, i * 3, index, pos);
          triangle.needsUpdate = true;
          if (intersectsTriangleFunc(triangle, i, contained, depth)) {
            return true;
          }
        }
        return false;
      }
      const tempV1 = /* @__PURE__ */ new three.Vector3();
      const tempV2 = /* @__PURE__ */ new three.Vector3();
      const tempV3 = /* @__PURE__ */ new three.Vector3();
      const tempUV1 = /* @__PURE__ */ new three.Vector2();
      const tempUV2 = /* @__PURE__ */ new three.Vector2();
      const tempUV3 = /* @__PURE__ */ new three.Vector2();
      function getTriangleHitPointInfo(point, geometry, triangleIndex, target) {
        const indices = geometry.getIndex().array;
        const positions = geometry.getAttribute("position");
        const uvs = geometry.getAttribute("uv");
        const a = indices[triangleIndex * 3];
        const b = indices[triangleIndex * 3 + 1];
        const c = indices[triangleIndex * 3 + 2];
        tempV1.fromBufferAttribute(positions, a);
        tempV2.fromBufferAttribute(positions, b);
        tempV3.fromBufferAttribute(positions, c);
        let materialIndex = 0;
        const groups = geometry.groups;
        const firstVertexIndex = triangleIndex * 3;
        for (let i = 0, l = groups.length; i < l; i++) {
          const group = groups[i];
          const { start, count } = group;
          if (firstVertexIndex >= start && firstVertexIndex < start + count) {
            materialIndex = group.materialIndex;
            break;
          }
        }
        let uv = null;
        if (uvs) {
          tempUV1.fromBufferAttribute(uvs, a);
          tempUV2.fromBufferAttribute(uvs, b);
          tempUV3.fromBufferAttribute(uvs, c);
          if (target && target.uv)
            uv = target.uv;
          else
            uv = new three.Vector2();
          three.Triangle.getUV(point, tempV1, tempV2, tempV3, tempUV1, tempUV2, tempUV3, uv);
        }
        if (target) {
          if (!target.face)
            target.face = {};
          target.face.a = a;
          target.face.b = b;
          target.face.c = c;
          target.face.materialIndex = materialIndex;
          if (!target.face.normal)
            target.face.normal = new three.Vector3();
          three.Triangle.getNormal(tempV1, tempV2, tempV3, target.face.normal);
          if (!target.uv)
            target.uv = new three.Vector2();
          target.uv.copy(uv);
          return target;
        } else {
          return {
            face: {
              a,
              b,
              c,
              materialIndex,
              normal: three.Triangle.getNormal(tempV1, tempV2, tempV3, new three.Vector3())
            },
            uv
          };
        }
      }
      class PrimitivePool {
        constructor(getNewPrimitive) {
          this._getNewPrimitive = getNewPrimitive;
          this._primitives = [];
        }
        getPrimitive() {
          const primitives = this._primitives;
          if (primitives.length === 0) {
            return this._getNewPrimitive();
          } else {
            return primitives.pop();
          }
        }
        releasePrimitive(primitive) {
          this._primitives.push(primitive);
        }
      }
      function IS_LEAF(n16, uint16Array) {
        return uint16Array[n16 + 15] === 65535;
      }
      function OFFSET(n32, uint32Array) {
        return uint32Array[n32 + 6];
      }
      function COUNT(n16, uint16Array) {
        return uint16Array[n16 + 14];
      }
      function LEFT_NODE(n32) {
        return n32 + 8;
      }
      function RIGHT_NODE(n32, uint32Array) {
        return uint32Array[n32 + 6];
      }
      function SPLIT_AXIS(n32, uint32Array) {
        return uint32Array[n32 + 7];
      }
      function BOUNDING_DATA_INDEX(n32) {
        return n32;
      }
      const boundingBox$1 = new three.Box3();
      const boxIntersection = new three.Vector3();
      const xyzFields = ["x", "y", "z"];
      function raycast(nodeIndex32, geometry, side, ray2, intersects) {
        let nodeIndex16 = nodeIndex32 * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;
        const isLeaf = IS_LEAF(nodeIndex16, uint16Array);
        if (isLeaf) {
          const offset = OFFSET(nodeIndex32, uint32Array);
          const count = COUNT(nodeIndex16, uint16Array);
          intersectTris(geometry, side, ray2, offset, count, intersects);
        } else {
          const leftIndex = LEFT_NODE(nodeIndex32);
          if (intersectRay(leftIndex, float32Array, ray2, boxIntersection)) {
            raycast(leftIndex, geometry, side, ray2, intersects);
          }
          const rightIndex = RIGHT_NODE(nodeIndex32, uint32Array);
          if (intersectRay(rightIndex, float32Array, ray2, boxIntersection)) {
            raycast(rightIndex, geometry, side, ray2, intersects);
          }
        }
      }
      function raycastFirst(nodeIndex32, geometry, side, ray2) {
        let nodeIndex16 = nodeIndex32 * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;
        const isLeaf = IS_LEAF(nodeIndex16, uint16Array);
        if (isLeaf) {
          const offset = OFFSET(nodeIndex32, uint32Array);
          const count = COUNT(nodeIndex16, uint16Array);
          return intersectClosestTri(geometry, side, ray2, offset, count);
        } else {
          const splitAxis = SPLIT_AXIS(nodeIndex32, uint32Array);
          const xyzAxis = xyzFields[splitAxis];
          const rayDir = ray2.direction[xyzAxis];
          const leftToRight = rayDir >= 0;
          let c1, c2;
          if (leftToRight) {
            c1 = LEFT_NODE(nodeIndex32);
            c2 = RIGHT_NODE(nodeIndex32, uint32Array);
          } else {
            c1 = RIGHT_NODE(nodeIndex32, uint32Array);
            c2 = LEFT_NODE(nodeIndex32);
          }
          const c1Intersection = intersectRay(c1, float32Array, ray2, boxIntersection);
          const c1Result = c1Intersection ? raycastFirst(c1, geometry, side, ray2) : null;
          if (c1Result) {
            const point = c1Result.point[xyzAxis];
            const isOutside = leftToRight ? point <= float32Array[c2 + splitAxis] : point >= float32Array[c2 + splitAxis + 3];
            if (isOutside) {
              return c1Result;
            }
          }
          const c2Intersection = intersectRay(c2, float32Array, ray2, boxIntersection);
          const c2Result = c2Intersection ? raycastFirst(c2, geometry, side, ray2) : null;
          if (c1Result && c2Result) {
            return c1Result.distance <= c2Result.distance ? c1Result : c2Result;
          } else {
            return c1Result || c2Result || null;
          }
        }
      }
      const shapecast = function() {
        let _box12, _box22;
        const boxStack = [];
        const boxPool = new PrimitivePool(() => new three.Box3());
        return function shapecast2(...args) {
          _box12 = boxPool.getPrimitive();
          _box22 = boxPool.getPrimitive();
          boxStack.push(_box12, _box22);
          const result = shapecastTraverse(...args);
          boxPool.releasePrimitive(_box12);
          boxPool.releasePrimitive(_box22);
          boxStack.pop();
          boxStack.pop();
          const length = boxStack.length;
          if (length > 0) {
            _box22 = boxStack[length - 1];
            _box12 = boxStack[length - 2];
          }
          return result;
        };
        function shapecastTraverse(nodeIndex32, geometry, intersectsBoundsFunc, intersectsRangeFunc, nodeScoreFunc = null, nodeIndexByteOffset = 0, depth = 0) {
          function getLeftOffset(nodeIndex322) {
            let nodeIndex162 = nodeIndex322 * 2, uint16Array2 = _uint16Array, uint32Array2 = _uint32Array;
            while (!IS_LEAF(nodeIndex162, uint16Array2)) {
              nodeIndex322 = LEFT_NODE(nodeIndex322);
              nodeIndex162 = nodeIndex322 * 2;
            }
            return OFFSET(nodeIndex322, uint32Array2);
          }
          function getRightEndOffset(nodeIndex322) {
            let nodeIndex162 = nodeIndex322 * 2, uint16Array2 = _uint16Array, uint32Array2 = _uint32Array;
            while (!IS_LEAF(nodeIndex162, uint16Array2)) {
              nodeIndex322 = RIGHT_NODE(nodeIndex322, uint32Array2);
              nodeIndex162 = nodeIndex322 * 2;
            }
            return OFFSET(nodeIndex322, uint32Array2) + COUNT(nodeIndex162, uint16Array2);
          }
          let nodeIndex16 = nodeIndex32 * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;
          const isLeaf = IS_LEAF(nodeIndex16, uint16Array);
          if (isLeaf) {
            const offset = OFFSET(nodeIndex32, uint32Array);
            const count = COUNT(nodeIndex16, uint16Array);
            arrayToBox(BOUNDING_DATA_INDEX(nodeIndex32), float32Array, _box12);
            return intersectsRangeFunc(offset, count, false, depth, nodeIndexByteOffset + nodeIndex32, _box12);
          } else {
            const left = LEFT_NODE(nodeIndex32);
            const right = RIGHT_NODE(nodeIndex32, uint32Array);
            let c1 = left;
            let c2 = right;
            let score1, score2;
            let box1, box2;
            if (nodeScoreFunc) {
              box1 = _box12;
              box2 = _box22;
              arrayToBox(BOUNDING_DATA_INDEX(c1), float32Array, box1);
              arrayToBox(BOUNDING_DATA_INDEX(c2), float32Array, box2);
              score1 = nodeScoreFunc(box1);
              score2 = nodeScoreFunc(box2);
              if (score2 < score1) {
                c1 = right;
                c2 = left;
                const temp5 = score1;
                score1 = score2;
                score2 = temp5;
                box1 = box2;
              }
            }
            if (!box1) {
              box1 = _box12;
              arrayToBox(BOUNDING_DATA_INDEX(c1), float32Array, box1);
            }
            const isC1Leaf = IS_LEAF(c1 * 2, uint16Array);
            const c1Intersection = intersectsBoundsFunc(box1, isC1Leaf, score1, depth + 1, nodeIndexByteOffset + c1);
            let c1StopTraversal;
            if (c1Intersection === CONTAINED) {
              const offset = getLeftOffset(c1);
              const end = getRightEndOffset(c1);
              const count = end - offset;
              c1StopTraversal = intersectsRangeFunc(offset, count, true, depth + 1, nodeIndexByteOffset + c1, box1);
            } else {
              c1StopTraversal = c1Intersection && shapecastTraverse(c1, geometry, intersectsBoundsFunc, intersectsRangeFunc, nodeScoreFunc, nodeIndexByteOffset, depth + 1);
            }
            if (c1StopTraversal)
              return true;
            box2 = _box22;
            arrayToBox(BOUNDING_DATA_INDEX(c2), float32Array, box2);
            const isC2Leaf = IS_LEAF(c2 * 2, uint16Array);
            const c2Intersection = intersectsBoundsFunc(box2, isC2Leaf, score2, depth + 1, nodeIndexByteOffset + c2);
            let c2StopTraversal;
            if (c2Intersection === CONTAINED) {
              const offset = getLeftOffset(c2);
              const end = getRightEndOffset(c2);
              const count = end - offset;
              c2StopTraversal = intersectsRangeFunc(offset, count, true, depth + 1, nodeIndexByteOffset + c2, box2);
            } else {
              c2StopTraversal = c2Intersection && shapecastTraverse(c2, geometry, intersectsBoundsFunc, intersectsRangeFunc, nodeScoreFunc, nodeIndexByteOffset, depth + 1);
            }
            if (c2StopTraversal)
              return true;
            return false;
          }
        }
      }();
      const intersectsGeometry = function() {
        const triangle = new ExtendedTriangle();
        const triangle2 = new ExtendedTriangle();
        const invertedMat = new three.Matrix4();
        const obb3 = new OrientedBox();
        const obb22 = new OrientedBox();
        return function intersectsGeometry2(nodeIndex32, geometry, otherGeometry, geometryToBvh, cachedObb = null) {
          let nodeIndex16 = nodeIndex32 * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;
          if (cachedObb === null) {
            if (!otherGeometry.boundingBox) {
              otherGeometry.computeBoundingBox();
            }
            obb3.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
            cachedObb = obb3;
          }
          const isLeaf = IS_LEAF(nodeIndex16, uint16Array);
          if (isLeaf) {
            const thisGeometry = geometry;
            const thisIndex = thisGeometry.index;
            const thisPos = thisGeometry.attributes.position;
            const index = otherGeometry.index;
            const pos = otherGeometry.attributes.position;
            const offset = OFFSET(nodeIndex32, uint32Array);
            const count = COUNT(nodeIndex16, uint16Array);
            invertedMat.copy(geometryToBvh).invert();
            if (otherGeometry.boundsTree) {
              arrayToBox(BOUNDING_DATA_INDEX(nodeIndex32), float32Array, obb22);
              obb22.matrix.copy(invertedMat);
              obb22.needsUpdate = true;
              const res = otherGeometry.boundsTree.shapecast({
                intersectsBounds: (box) => obb22.intersectsBox(box),
                intersectsTriangle: (tri) => {
                  tri.a.applyMatrix4(geometryToBvh);
                  tri.b.applyMatrix4(geometryToBvh);
                  tri.c.applyMatrix4(geometryToBvh);
                  tri.needsUpdate = true;
                  for (let i = offset * 3, l = (count + offset) * 3; i < l; i += 3) {
                    setTriangle(triangle2, i, thisIndex, thisPos);
                    triangle2.needsUpdate = true;
                    if (tri.intersectsTriangle(triangle2)) {
                      return true;
                    }
                  }
                  return false;
                }
              });
              return res;
            } else {
              for (let i = offset * 3, l = count + offset * 3; i < l; i += 3) {
                setTriangle(triangle, i, thisIndex, thisPos);
                triangle.a.applyMatrix4(invertedMat);
                triangle.b.applyMatrix4(invertedMat);
                triangle.c.applyMatrix4(invertedMat);
                triangle.needsUpdate = true;
                for (let i2 = 0, l2 = index.count; i2 < l2; i2 += 3) {
                  setTriangle(triangle2, i2, index, pos);
                  triangle2.needsUpdate = true;
                  if (triangle.intersectsTriangle(triangle2)) {
                    return true;
                  }
                }
              }
            }
          } else {
            const left = nodeIndex32 + 8;
            const right = uint32Array[nodeIndex32 + 6];
            arrayToBox(BOUNDING_DATA_INDEX(left), float32Array, boundingBox$1);
            const leftIntersection = cachedObb.intersectsBox(boundingBox$1) && intersectsGeometry2(left, geometry, otherGeometry, geometryToBvh, cachedObb);
            if (leftIntersection)
              return true;
            arrayToBox(BOUNDING_DATA_INDEX(right), float32Array, boundingBox$1);
            const rightIntersection = cachedObb.intersectsBox(boundingBox$1) && intersectsGeometry2(right, geometry, otherGeometry, geometryToBvh, cachedObb);
            if (rightIntersection)
              return true;
            return false;
          }
        };
      }();
      function intersectRay(nodeIndex32, array, ray2, target) {
        arrayToBox(nodeIndex32, array, boundingBox$1);
        return ray2.intersectBox(boundingBox$1, target);
      }
      const bufferStack = [];
      let _prevBuffer;
      let _float32Array;
      let _uint16Array;
      let _uint32Array;
      function setBuffer(buffer) {
        if (_prevBuffer) {
          bufferStack.push(_prevBuffer);
        }
        _prevBuffer = buffer;
        _float32Array = new Float32Array(buffer);
        _uint16Array = new Uint16Array(buffer);
        _uint32Array = new Uint32Array(buffer);
      }
      function clearBuffer() {
        _prevBuffer = null;
        _float32Array = null;
        _uint16Array = null;
        _uint32Array = null;
        if (bufferStack.length) {
          setBuffer(bufferStack.pop());
        }
      }
      const SKIP_GENERATION = Symbol("skip tree generation");
      const aabb = /* @__PURE__ */ new three.Box3();
      const aabb2 = /* @__PURE__ */ new three.Box3();
      const tempMatrix = /* @__PURE__ */ new three.Matrix4();
      const obb = /* @__PURE__ */ new OrientedBox();
      const obb2 = /* @__PURE__ */ new OrientedBox();
      const temp = /* @__PURE__ */ new three.Vector3();
      const temp1 = /* @__PURE__ */ new three.Vector3();
      const temp2 = /* @__PURE__ */ new three.Vector3();
      const temp3 = /* @__PURE__ */ new three.Vector3();
      const temp4 = /* @__PURE__ */ new three.Vector3();
      const tempBox = /* @__PURE__ */ new three.Box3();
      const trianglePool = /* @__PURE__ */ new PrimitivePool(() => new ExtendedTriangle());
      class MeshBVH {
        static serialize(bvh, options = {}) {
          if (options.isBufferGeometry) {
            console.warn("MeshBVH.serialize: The arguments for the function have changed. See documentation for new signature.");
            return MeshBVH.serialize(arguments[0], {
              cloneBuffers: arguments[2] === void 0 ? true : arguments[2]
            });
          }
          options = __spreadValues({
            cloneBuffers: true
          }, options);
          const geometry = bvh.geometry;
          const rootData = bvh._roots;
          const indexAttribute = geometry.getIndex();
          let result;
          if (options.cloneBuffers) {
            result = {
              roots: rootData.map((root) => root.slice()),
              index: indexAttribute.array.slice()
            };
          } else {
            result = {
              roots: rootData,
              index: indexAttribute.array
            };
          }
          return result;
        }
        static deserialize(data, geometry, options = {}) {
          if (typeof options === "boolean") {
            console.warn("MeshBVH.deserialize: The arguments for the function have changed. See documentation for new signature.");
            return MeshBVH.deserialize(arguments[0], arguments[1], {
              setIndex: arguments[2] === void 0 ? true : arguments[2]
            });
          }
          options = __spreadValues({
            setIndex: true
          }, options);
          const { index, roots } = data;
          const bvh = new MeshBVH(geometry, __spreadProps(__spreadValues({}, options), { [SKIP_GENERATION]: true }));
          bvh._roots = roots;
          if (options.setIndex) {
            const indexAttribute = geometry.getIndex();
            if (indexAttribute === null) {
              const newIndex = new three.BufferAttribute(data.index, 1, false);
              geometry.setIndex(newIndex);
            } else if (indexAttribute.array !== index) {
              indexAttribute.array.set(index);
              indexAttribute.needsUpdate = true;
            }
          }
          return bvh;
        }
        constructor(geometry, options = {}) {
          if (!geometry.isBufferGeometry) {
            throw new Error("MeshBVH: Only BufferGeometries are supported.");
          } else if (geometry.index && geometry.index.isInterleavedBufferAttribute) {
            throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.");
          }
          options = Object.assign({
            strategy: CENTER,
            maxDepth: 40,
            maxLeafTris: 10,
            verbose: true,
            useSharedArrayBuffer: false,
            setBoundingBox: true,
            onProgress: null,
            [SKIP_GENERATION]: false
          }, options);
          if (options.useSharedArrayBuffer && typeof SharedArrayBuffer === "undefined") {
            throw new Error("MeshBVH: SharedArrayBuffer is not available.");
          }
          this._roots = null;
          if (!options[SKIP_GENERATION]) {
            this._roots = buildPackedTree(geometry, options);
            if (!geometry.boundingBox && options.setBoundingBox) {
              geometry.boundingBox = this.getBoundingBox(new three.Box3());
            }
          }
          this.geometry = geometry;
        }
        refit(nodeIndices = null) {
          if (nodeIndices && Array.isArray(nodeIndices)) {
            nodeIndices = new Set(nodeIndices);
          }
          const geometry = this.geometry;
          const indexArr = geometry.index.array;
          const posAttr = geometry.attributes.position;
          const posArr = posAttr.array;
          const bufferOffset = posAttr.offset || 0;
          let stride = 3;
          if (posAttr.isInterleavedBufferAttribute) {
            stride = posAttr.data.stride;
          }
          let buffer, uint32Array, uint16Array, float32Array;
          let byteOffset = 0;
          const roots = this._roots;
          for (let i = 0, l = roots.length; i < l; i++) {
            buffer = roots[i];
            uint32Array = new Uint32Array(buffer);
            uint16Array = new Uint16Array(buffer);
            float32Array = new Float32Array(buffer);
            _traverse(0, byteOffset);
            byteOffset += buffer.byteLength;
          }
          function _traverse(node32Index, byteOffset2, force = false) {
            const node16Index = node32Index * 2;
            const isLeaf = uint16Array[node16Index + 15] === IS_LEAFNODE_FLAG;
            if (isLeaf) {
              const offset = uint32Array[node32Index + 6];
              const count = uint16Array[node16Index + 14];
              let minx = Infinity;
              let miny = Infinity;
              let minz = Infinity;
              let maxx = -Infinity;
              let maxy = -Infinity;
              let maxz = -Infinity;
              for (let i = 3 * offset, l = 3 * (offset + count); i < l; i++) {
                const index = indexArr[i] * stride + bufferOffset;
                const x = posArr[index + 0];
                const y = posArr[index + 1];
                const z = posArr[index + 2];
                if (x < minx)
                  minx = x;
                if (x > maxx)
                  maxx = x;
                if (y < miny)
                  miny = y;
                if (y > maxy)
                  maxy = y;
                if (z < minz)
                  minz = z;
                if (z > maxz)
                  maxz = z;
              }
              if (float32Array[node32Index + 0] !== minx || float32Array[node32Index + 1] !== miny || float32Array[node32Index + 2] !== minz || float32Array[node32Index + 3] !== maxx || float32Array[node32Index + 4] !== maxy || float32Array[node32Index + 5] !== maxz) {
                float32Array[node32Index + 0] = minx;
                float32Array[node32Index + 1] = miny;
                float32Array[node32Index + 2] = minz;
                float32Array[node32Index + 3] = maxx;
                float32Array[node32Index + 4] = maxy;
                float32Array[node32Index + 5] = maxz;
                return true;
              } else {
                return false;
              }
            } else {
              const left = node32Index + 8;
              const right = uint32Array[node32Index + 6];
              const offsetLeft = left + byteOffset2;
              const offsetRight = right + byteOffset2;
              let forceChildren = force;
              let includesLeft = false;
              let includesRight = false;
              if (nodeIndices) {
                if (!forceChildren) {
                  includesLeft = nodeIndices.has(offsetLeft);
                  includesRight = nodeIndices.has(offsetRight);
                  forceChildren = !includesLeft && !includesRight;
                }
              } else {
                includesLeft = true;
                includesRight = true;
              }
              const traverseLeft = forceChildren || includesLeft;
              const traverseRight = forceChildren || includesRight;
              let leftChange = false;
              if (traverseLeft) {
                leftChange = _traverse(left, byteOffset2, forceChildren);
              }
              let rightChange = false;
              if (traverseRight) {
                rightChange = _traverse(right, byteOffset2, forceChildren);
              }
              const didChange = leftChange || rightChange;
              if (didChange) {
                for (let i = 0; i < 3; i++) {
                  const lefti = left + i;
                  const righti = right + i;
                  const minLeftValue = float32Array[lefti];
                  const maxLeftValue = float32Array[lefti + 3];
                  const minRightValue = float32Array[righti];
                  const maxRightValue = float32Array[righti + 3];
                  float32Array[node32Index + i] = minLeftValue < minRightValue ? minLeftValue : minRightValue;
                  float32Array[node32Index + i + 3] = maxLeftValue > maxRightValue ? maxLeftValue : maxRightValue;
                }
              }
              return didChange;
            }
          }
        }
        traverse(callback, rootIndex = 0) {
          const buffer = this._roots[rootIndex];
          const uint32Array = new Uint32Array(buffer);
          const uint16Array = new Uint16Array(buffer);
          _traverse(0);
          function _traverse(node32Index, depth = 0) {
            const node16Index = node32Index * 2;
            const isLeaf = uint16Array[node16Index + 15] === IS_LEAFNODE_FLAG;
            if (isLeaf) {
              const offset = uint32Array[node32Index + 6];
              const count = uint16Array[node16Index + 14];
              callback(depth, isLeaf, new Float32Array(buffer, node32Index * 4, 6), offset, count);
            } else {
              const left = node32Index + BYTES_PER_NODE / 4;
              const right = uint32Array[node32Index + 6];
              const splitAxis = uint32Array[node32Index + 7];
              const stopTraversal = callback(depth, isLeaf, new Float32Array(buffer, node32Index * 4, 6), splitAxis);
              if (!stopTraversal) {
                _traverse(left, depth + 1);
                _traverse(right, depth + 1);
              }
            }
          }
        }
        raycast(ray2, materialOrSide = three.FrontSide) {
          const roots = this._roots;
          const geometry = this.geometry;
          const intersects = [];
          const isMaterial = materialOrSide.isMaterial;
          const isArrayMaterial = Array.isArray(materialOrSide);
          const groups = geometry.groups;
          const side = isMaterial ? materialOrSide.side : materialOrSide;
          for (let i = 0, l = roots.length; i < l; i++) {
            const materialSide = isArrayMaterial ? materialOrSide[groups[i].materialIndex].side : side;
            const startCount = intersects.length;
            setBuffer(roots[i]);
            raycast(0, geometry, materialSide, ray2, intersects);
            clearBuffer();
            if (isArrayMaterial) {
              const materialIndex = groups[i].materialIndex;
              for (let j = startCount, jl = intersects.length; j < jl; j++) {
                intersects[j].face.materialIndex = materialIndex;
              }
            }
          }
          return intersects;
        }
        raycastFirst(ray2, materialOrSide = three.FrontSide) {
          const roots = this._roots;
          const geometry = this.geometry;
          const isMaterial = materialOrSide.isMaterial;
          const isArrayMaterial = Array.isArray(materialOrSide);
          let closestResult = null;
          const groups = geometry.groups;
          const side = isMaterial ? materialOrSide.side : materialOrSide;
          for (let i = 0, l = roots.length; i < l; i++) {
            const materialSide = isArrayMaterial ? materialOrSide[groups[i].materialIndex].side : side;
            setBuffer(roots[i]);
            const result = raycastFirst(0, geometry, materialSide, ray2);
            clearBuffer();
            if (result != null && (closestResult == null || result.distance < closestResult.distance)) {
              closestResult = result;
              if (isArrayMaterial) {
                result.face.materialIndex = groups[i].materialIndex;
              }
            }
          }
          return closestResult;
        }
        intersectsGeometry(otherGeometry, geomToMesh) {
          const geometry = this.geometry;
          let result = false;
          for (const root of this._roots) {
            setBuffer(root);
            result = intersectsGeometry(0, geometry, otherGeometry, geomToMesh);
            clearBuffer();
            if (result) {
              break;
            }
          }
          return result;
        }
        shapecast(callbacks, _intersectsTriangleFunc, _orderNodesFunc) {
          const geometry = this.geometry;
          if (callbacks instanceof Function) {
            if (_intersectsTriangleFunc) {
              const originalTriangleFunc = _intersectsTriangleFunc;
              _intersectsTriangleFunc = (tri, index, contained, depth) => {
                const i3 = index * 3;
                return originalTriangleFunc(tri, i3, i3 + 1, i3 + 2, contained, depth);
              };
            }
            callbacks = {
              boundsTraverseOrder: _orderNodesFunc,
              intersectsBounds: callbacks,
              intersectsTriangle: _intersectsTriangleFunc,
              intersectsRange: null
            };
            console.warn("MeshBVH: Shapecast function signature has changed and now takes an object of callbacks as a second argument. See docs for new signature.");
          }
          const triangle = trianglePool.getPrimitive();
          let {
            boundsTraverseOrder,
            intersectsBounds,
            intersectsRange,
            intersectsTriangle
          } = callbacks;
          if (intersectsRange && intersectsTriangle) {
            const originalIntersectsRange = intersectsRange;
            intersectsRange = (offset, count, contained, depth, nodeIndex) => {
              if (!originalIntersectsRange(offset, count, contained, depth, nodeIndex)) {
                return iterateOverTriangles(offset, count, geometry, intersectsTriangle, contained, depth, triangle);
              }
              return true;
            };
          } else if (!intersectsRange) {
            if (intersectsTriangle) {
              intersectsRange = (offset, count, contained, depth) => {
                return iterateOverTriangles(offset, count, geometry, intersectsTriangle, contained, depth, triangle);
              };
            } else {
              intersectsRange = (offset, count, contained) => {
                return contained;
              };
            }
          }
          let result = false;
          let byteOffset = 0;
          for (const root of this._roots) {
            setBuffer(root);
            result = shapecast(0, geometry, intersectsBounds, intersectsRange, boundsTraverseOrder, byteOffset);
            clearBuffer();
            if (result) {
              break;
            }
            byteOffset += root.byteLength;
          }
          trianglePool.releasePrimitive(triangle);
          return result;
        }
        bvhcast(otherBvh, matrixToLocal, callbacks) {
          let {
            intersectsRanges,
            intersectsTriangles
          } = callbacks;
          const indexAttr = this.geometry.index;
          const positionAttr = this.geometry.attributes.position;
          const otherIndexAttr = otherBvh.geometry.index;
          const otherPositionAttr = otherBvh.geometry.attributes.position;
          tempMatrix.copy(matrixToLocal).invert();
          const triangle = trianglePool.getPrimitive();
          const triangle2 = trianglePool.getPrimitive();
          if (intersectsTriangles) {
            let iterateOverDoubleTriangles = function(offset1, count1, offset2, count2, depth1, index1, depth2, index2) {
              for (let i2 = offset2, l2 = offset2 + count2; i2 < l2; i2++) {
                setTriangle(triangle2, i2 * 3, otherIndexAttr, otherPositionAttr);
                triangle2.a.applyMatrix4(matrixToLocal);
                triangle2.b.applyMatrix4(matrixToLocal);
                triangle2.c.applyMatrix4(matrixToLocal);
                triangle2.needsUpdate = true;
                for (let i1 = offset1, l1 = offset1 + count1; i1 < l1; i1++) {
                  setTriangle(triangle, i1 * 3, indexAttr, positionAttr);
                  triangle.needsUpdate = true;
                  if (intersectsTriangles(triangle, triangle2, i1, i2, depth1, index1, depth2, index2)) {
                    return true;
                  }
                }
              }
              return false;
            };
            if (intersectsRanges) {
              const originalIntersectsRanges = intersectsRanges;
              intersectsRanges = function(offset1, count1, offset2, count2, depth1, index1, depth2, index2) {
                if (!originalIntersectsRanges(offset1, count1, offset2, count2, depth1, index1, depth2, index2)) {
                  return iterateOverDoubleTriangles(offset1, count1, offset2, count2, depth1, index1, depth2, index2);
                }
                return true;
              };
            } else {
              intersectsRanges = iterateOverDoubleTriangles;
            }
          }
          this.getBoundingBox(aabb2);
          aabb2.applyMatrix4(matrixToLocal);
          const result = this.shapecast({
            intersectsBounds: (box) => aabb2.intersectsBox(box),
            intersectsRange: (offset1, count1, contained, depth1, nodeIndex1, box) => {
              aabb.copy(box);
              aabb.applyMatrix4(tempMatrix);
              return otherBvh.shapecast({
                intersectsBounds: (box2) => aabb.intersectsBox(box2),
                intersectsRange: (offset2, count2, contained2, depth2, nodeIndex2) => {
                  return intersectsRanges(offset1, count1, offset2, count2, depth1, nodeIndex1, depth2, nodeIndex2);
                }
              });
            }
          });
          trianglePool.releasePrimitive(triangle);
          trianglePool.releasePrimitive(triangle2);
          return result;
        }
        intersectsBox(box, boxToMesh) {
          obb.set(box.min, box.max, boxToMesh);
          obb.needsUpdate = true;
          return this.shapecast({
            intersectsBounds: (box2) => obb.intersectsBox(box2),
            intersectsTriangle: (tri) => obb.intersectsTriangle(tri)
          });
        }
        intersectsSphere(sphere) {
          return this.shapecast({
            intersectsBounds: (box) => sphere.intersectsBox(box),
            intersectsTriangle: (tri) => tri.intersectsSphere(sphere)
          });
        }
        closestPointToGeometry(otherGeometry, geometryToBvh, target1 = {}, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
          if (!otherGeometry.boundingBox) {
            otherGeometry.computeBoundingBox();
          }
          obb.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
          obb.needsUpdate = true;
          const geometry = this.geometry;
          const pos = geometry.attributes.position;
          const index = geometry.index;
          const otherPos = otherGeometry.attributes.position;
          const otherIndex = otherGeometry.index;
          const triangle = trianglePool.getPrimitive();
          const triangle2 = trianglePool.getPrimitive();
          let tempTarget1 = temp1;
          let tempTargetDest1 = temp2;
          let tempTarget2 = null;
          let tempTargetDest2 = null;
          if (target2) {
            tempTarget2 = temp3;
            tempTargetDest2 = temp4;
          }
          let closestDistance = Infinity;
          let closestDistanceTriIndex = null;
          let closestDistanceOtherTriIndex = null;
          tempMatrix.copy(geometryToBvh).invert();
          obb2.matrix.copy(tempMatrix);
          this.shapecast({
            boundsTraverseOrder: (box) => {
              return obb.distanceToBox(box);
            },
            intersectsBounds: (box, isLeaf, score) => {
              if (score < closestDistance && score < maxThreshold) {
                if (isLeaf) {
                  obb2.min.copy(box.min);
                  obb2.max.copy(box.max);
                  obb2.needsUpdate = true;
                }
                return true;
              }
              return false;
            },
            intersectsRange: (offset, count) => {
              if (otherGeometry.boundsTree) {
                return otherGeometry.boundsTree.shapecast({
                  boundsTraverseOrder: (box) => {
                    return obb2.distanceToBox(box);
                  },
                  intersectsBounds: (box, isLeaf, score) => {
                    return score < closestDistance && score < maxThreshold;
                  },
                  intersectsRange: (otherOffset, otherCount) => {
                    for (let i2 = otherOffset * 3, l2 = (otherOffset + otherCount) * 3; i2 < l2; i2 += 3) {
                      setTriangle(triangle2, i2, otherIndex, otherPos);
                      triangle2.a.applyMatrix4(geometryToBvh);
                      triangle2.b.applyMatrix4(geometryToBvh);
                      triangle2.c.applyMatrix4(geometryToBvh);
                      triangle2.needsUpdate = true;
                      for (let i = offset * 3, l = (offset + count) * 3; i < l; i += 3) {
                        setTriangle(triangle, i, index, pos);
                        triangle.needsUpdate = true;
                        const dist = triangle.distanceToTriangle(triangle2, tempTarget1, tempTarget2);
                        if (dist < closestDistance) {
                          tempTargetDest1.copy(tempTarget1);
                          if (tempTargetDest2) {
                            tempTargetDest2.copy(tempTarget2);
                          }
                          closestDistance = dist;
                          closestDistanceTriIndex = i / 3;
                          closestDistanceOtherTriIndex = i2 / 3;
                        }
                        if (dist < minThreshold) {
                          return true;
                        }
                      }
                    }
                  }
                });
              } else {
                const triCount = otherIndex ? otherIndex.count : otherPos.count;
                for (let i2 = 0, l2 = triCount; i2 < l2; i2 += 3) {
                  setTriangle(triangle2, i2, otherIndex, otherPos);
                  triangle2.a.applyMatrix4(geometryToBvh);
                  triangle2.b.applyMatrix4(geometryToBvh);
                  triangle2.c.applyMatrix4(geometryToBvh);
                  triangle2.needsUpdate = true;
                  for (let i = offset * 3, l = (offset + count) * 3; i < l; i += 3) {
                    setTriangle(triangle, i, index, pos);
                    triangle.needsUpdate = true;
                    const dist = triangle.distanceToTriangle(triangle2, tempTarget1, tempTarget2);
                    if (dist < closestDistance) {
                      tempTargetDest1.copy(tempTarget1);
                      if (tempTargetDest2) {
                        tempTargetDest2.copy(tempTarget2);
                      }
                      closestDistance = dist;
                      closestDistanceTriIndex = i / 3;
                      closestDistanceOtherTriIndex = i2 / 3;
                    }
                    if (dist < minThreshold) {
                      return true;
                    }
                  }
                }
              }
            }
          });
          trianglePool.releasePrimitive(triangle);
          trianglePool.releasePrimitive(triangle2);
          if (closestDistance === Infinity)
            return null;
          if (!target1.point)
            target1.point = tempTargetDest1.clone();
          else
            target1.point.copy(tempTargetDest1);
          target1.distance = closestDistance, target1.faceIndex = closestDistanceTriIndex;
          if (target2) {
            if (!target2.point)
              target2.point = tempTargetDest2.clone();
            else
              target2.point.copy(tempTargetDest2);
            target2.point.applyMatrix4(tempMatrix);
            tempTargetDest1.applyMatrix4(tempMatrix);
            target2.distance = tempTargetDest1.sub(target2.point).length();
            target2.faceIndex = closestDistanceOtherTriIndex;
          }
          return target1;
        }
        closestPointToPoint(point, target = {}, minThreshold = 0, maxThreshold = Infinity) {
          const minThresholdSq = minThreshold * minThreshold;
          const maxThresholdSq = maxThreshold * maxThreshold;
          let closestDistanceSq = Infinity;
          let closestDistanceTriIndex = null;
          this.shapecast({
            boundsTraverseOrder: (box) => {
              temp.copy(point).clamp(box.min, box.max);
              return temp.distanceToSquared(point);
            },
            intersectsBounds: (box, isLeaf, score) => {
              return score < closestDistanceSq && score < maxThresholdSq;
            },
            intersectsTriangle: (tri, triIndex) => {
              tri.closestPointToPoint(point, temp);
              const distSq = point.distanceToSquared(temp);
              if (distSq < closestDistanceSq) {
                temp1.copy(temp);
                closestDistanceSq = distSq;
                closestDistanceTriIndex = triIndex;
              }
              if (distSq < minThresholdSq) {
                return true;
              } else {
                return false;
              }
            }
          });
          if (closestDistanceSq === Infinity)
            return null;
          const closestDistance = Math.sqrt(closestDistanceSq);
          if (!target.point)
            target.point = temp1.clone();
          else
            target.point.copy(temp1);
          target.distance = closestDistance, target.faceIndex = closestDistanceTriIndex;
          return target;
        }
        getBoundingBox(target) {
          target.makeEmpty();
          const roots = this._roots;
          roots.forEach((buffer) => {
            arrayToBox(0, new Float32Array(buffer), tempBox);
            target.union(tempBox);
          });
          return target;
        }
      }
      const originalRaycast = MeshBVH.prototype.raycast;
      MeshBVH.prototype.raycast = function(...args) {
        if (args[0].isMesh) {
          console.warn('MeshBVH: The function signature and results frame for "raycast" has changed. See docs for new signature.');
          const [
            mesh,
            raycaster,
            ray2,
            intersects
          ] = args;
          const results = originalRaycast.call(this, ray2, mesh.material);
          results.forEach((hit) => {
            hit = convertRaycastIntersect(hit, mesh, raycaster);
            if (hit) {
              intersects.push(hit);
            }
          });
          return intersects;
        } else {
          return originalRaycast.apply(this, args);
        }
      };
      const originalRaycastFirst = MeshBVH.prototype.raycastFirst;
      MeshBVH.prototype.raycastFirst = function(...args) {
        if (args[0].isMesh) {
          console.warn('MeshBVH: The function signature and results frame for "raycastFirst" has changed. See docs for new signature.');
          const [
            mesh,
            raycaster,
            ray2
          ] = args;
          return convertRaycastIntersect(originalRaycastFirst.call(this, ray2, mesh.material), mesh, raycaster);
        } else {
          return originalRaycastFirst.apply(this, args);
        }
      };
      const originalClosestPointToPoint = MeshBVH.prototype.closestPointToPoint;
      MeshBVH.prototype.closestPointToPoint = function(...args) {
        if (args[0].isMesh) {
          console.warn('MeshBVH: The function signature and results frame for "closestPointToPoint" has changed. See docs for new signature.');
          args.unshift();
          const target = args[1];
          const result = {};
          args[1] = result;
          originalClosestPointToPoint.apply(this, args);
          if (target) {
            target.copy(result.point);
          }
          return result.distance;
        } else {
          return originalClosestPointToPoint.apply(this, args);
        }
      };
      const originalClosestPointToGeometry = MeshBVH.prototype.closestPointToGeometry;
      MeshBVH.prototype.closestPointToGeometry = function(...args) {
        const target1 = args[2];
        const target2 = args[3];
        if (target1 && target1.isVector3 || target2 && target2.isVector3) {
          console.warn('MeshBVH: The function signature and results frame for "closestPointToGeometry" has changed. See docs for new signature.');
          const result1 = {};
          const result2 = {};
          const geometryToBvh = args[1];
          args[2] = result1;
          args[3] = result2;
          originalClosestPointToGeometry.apply(this, args);
          if (target1) {
            target1.copy(result1.point);
          }
          if (target2) {
            target2.copy(result2.point).applyMatrix4(geometryToBvh);
          }
          return result1.distance;
        } else {
          return originalClosestPointToGeometry.apply(this, args);
        }
      };
      const originalRefit = MeshBVH.prototype.refit;
      MeshBVH.prototype.refit = function(...args) {
        const nodeIndices = args[0];
        const terminationIndices = args[1];
        if (terminationIndices && (terminationIndices instanceof Set || Array.isArray(terminationIndices))) {
          console.warn('MeshBVH: The function signature for "refit" has changed. See docs for new signature.');
          const newNodeIndices = /* @__PURE__ */ new Set();
          terminationIndices.forEach((v) => newNodeIndices.add(v));
          if (nodeIndices) {
            nodeIndices.forEach((v) => newNodeIndices.add(v));
          }
          originalRefit.call(this, newNodeIndices);
        } else {
          originalRefit.apply(this, args);
        }
      };
      [
        "intersectsGeometry",
        "shapecast",
        "intersectsBox",
        "intersectsSphere"
      ].forEach((name) => {
        const originalFunc = MeshBVH.prototype[name];
        MeshBVH.prototype[name] = function(...args) {
          if (args[0] === null || args[0].isMesh) {
            args.shift();
            console.warn(`MeshBVH: The function signature for "${name}" has changed and no longer takes Mesh. See docs for new signature.`);
          }
          return originalFunc.apply(this, args);
        };
      });
      const boundingBox = /* @__PURE__ */ new three.Box3();
      class MeshBVHRootVisualizer extends three.Object3D {
        get isMesh() {
          return !this.displayEdges;
        }
        get isLineSegments() {
          return this.displayEdges;
        }
        get isLine() {
          return this.displayEdges;
        }
        constructor(mesh, material, depth = 10, group = 0) {
          super();
          this.material = material;
          this.geometry = new three.BufferGeometry();
          this.name = "MeshBVHRootVisualizer";
          this.depth = depth;
          this.displayParents = false;
          this.mesh = mesh;
          this.displayEdges = true;
          this._group = group;
        }
        raycast() {
        }
        update() {
          const geometry = this.geometry;
          const boundsTree = this.mesh.geometry.boundsTree;
          const group = this._group;
          geometry.dispose();
          this.visible = false;
          if (boundsTree) {
            const targetDepth = this.depth - 1;
            const displayParents = this.displayParents;
            let boundsCount = 0;
            boundsTree.traverse((depth, isLeaf) => {
              if (depth === targetDepth || isLeaf) {
                boundsCount++;
                return true;
              } else if (displayParents) {
                boundsCount++;
              }
            }, group);
            let posIndex = 0;
            const positionArray = new Float32Array(8 * 3 * boundsCount);
            boundsTree.traverse((depth, isLeaf, boundingData) => {
              const terminate = depth === targetDepth || isLeaf;
              if (terminate || displayParents) {
                arrayToBox(0, boundingData, boundingBox);
                const { min, max } = boundingBox;
                for (let x = -1; x <= 1; x += 2) {
                  const xVal = x < 0 ? min.x : max.x;
                  for (let y = -1; y <= 1; y += 2) {
                    const yVal = y < 0 ? min.y : max.y;
                    for (let z = -1; z <= 1; z += 2) {
                      const zVal = z < 0 ? min.z : max.z;
                      positionArray[posIndex + 0] = xVal;
                      positionArray[posIndex + 1] = yVal;
                      positionArray[posIndex + 2] = zVal;
                      posIndex += 3;
                    }
                  }
                }
                return terminate;
              }
            }, group);
            let indexArray;
            let indices;
            if (this.displayEdges) {
              indices = new Uint8Array([
                0,
                4,
                1,
                5,
                2,
                6,
                3,
                7,
                0,
                2,
                1,
                3,
                4,
                6,
                5,
                7,
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7
              ]);
            } else {
              indices = new Uint8Array([
                0,
                1,
                2,
                2,
                1,
                3,
                4,
                6,
                5,
                6,
                7,
                5,
                1,
                4,
                5,
                0,
                4,
                1,
                2,
                3,
                6,
                3,
                7,
                6,
                0,
                2,
                4,
                2,
                6,
                4,
                1,
                5,
                3,
                3,
                5,
                7
              ]);
            }
            if (positionArray.length > 65535) {
              indexArray = new Uint32Array(indices.length * boundsCount);
            } else {
              indexArray = new Uint16Array(indices.length * boundsCount);
            }
            const indexLength = indices.length;
            for (let i = 0; i < boundsCount; i++) {
              const posOffset = i * 8;
              const indexOffset = i * indexLength;
              for (let j = 0; j < indexLength; j++) {
                indexArray[indexOffset + j] = posOffset + indices[j];
              }
            }
            geometry.setIndex(new three.BufferAttribute(indexArray, 1, false));
            geometry.setAttribute("position", new three.BufferAttribute(positionArray, 3, false));
            this.visible = true;
          }
        }
      }
      class MeshBVHVisualizer extends three.Group {
        get color() {
          return this.edgeMaterial.color;
        }
        get opacity() {
          return this.edgeMaterial.opacity;
        }
        set opacity(v) {
          this.edgeMaterial.opacity = v;
          this.meshMaterial.opacity = v;
        }
        constructor(mesh, depth = 10) {
          super();
          this.name = "MeshBVHVisualizer";
          this.depth = depth;
          this.mesh = mesh;
          this.displayParents = false;
          this.displayEdges = true;
          this._roots = [];
          const edgeMaterial = new three.LineBasicMaterial({
            color: 65416,
            transparent: true,
            opacity: 0.3,
            depthWrite: false
          });
          const meshMaterial = new three.MeshBasicMaterial({
            color: 65416,
            transparent: true,
            opacity: 0.3,
            depthWrite: false
          });
          meshMaterial.color = edgeMaterial.color;
          this.edgeMaterial = edgeMaterial;
          this.meshMaterial = meshMaterial;
          this.update();
        }
        update() {
          const bvh = this.mesh.geometry.boundsTree;
          const totalRoots = bvh ? bvh._roots.length : 0;
          while (this._roots.length > totalRoots) {
            this._roots.pop();
          }
          for (let i = 0; i < totalRoots; i++) {
            if (i >= this._roots.length) {
              const root2 = new MeshBVHRootVisualizer(this.mesh, this.edgeMaterial, this.depth, i);
              this.add(root2);
              this._roots.push(root2);
            }
            const root = this._roots[i];
            root.depth = this.depth;
            root.mesh = this.mesh;
            root.displayParents = this.displayParents;
            root.displayEdges = this.displayEdges;
            root.material = this.displayEdges ? this.edgeMaterial : this.meshMaterial;
            root.update();
          }
        }
        updateMatrixWorld(...args) {
          this.position.copy(this.mesh.position);
          this.rotation.copy(this.mesh.rotation);
          this.scale.copy(this.mesh.scale);
          super.updateMatrixWorld(...args);
        }
        copy(source) {
          this.depth = source.depth;
          this.mesh = source.mesh;
        }
        clone() {
          return new MeshBVHVisualizer(this.mesh, this.depth);
        }
        dispose() {
          this.edgeMaterial.dispose();
          this.meshMaterial.dispose();
          const children = this.children;
          for (let i = 0, l = children.length; i < l; i++) {
            children[i].geometry.dispose();
          }
        }
      }
      const _box1 = /* @__PURE__ */ new three.Box3();
      const _box2 = /* @__PURE__ */ new three.Box3();
      const _vec = /* @__PURE__ */ new three.Vector3();
      function getPrimitiveSize(el) {
        switch (typeof el) {
          case "number":
            return 8;
          case "string":
            return el.length * 2;
          case "boolean":
            return 4;
          default:
            return 0;
        }
      }
      function isTypedArray(arr) {
        const regex = /(Uint|Int|Float)(8|16|32)Array/;
        return regex.test(arr.constructor.name);
      }
      function getRootExtremes(bvh, group) {
        const result = {
          nodeCount: 0,
          leafNodeCount: 0,
          depth: {
            min: Infinity,
            max: -Infinity
          },
          tris: {
            min: Infinity,
            max: -Infinity
          },
          splits: [0, 0, 0],
          surfaceAreaScore: 0
        };
        bvh.traverse((depth, isLeaf, boundingData, offsetOrSplit, count) => {
          const l0 = boundingData[0 + 3] - boundingData[0];
          const l1 = boundingData[1 + 3] - boundingData[1];
          const l2 = boundingData[2 + 3] - boundingData[2];
          const surfaceArea = 2 * (l0 * l1 + l1 * l2 + l2 * l0);
          result.nodeCount++;
          if (isLeaf) {
            result.leafNodeCount++;
            result.depth.min = Math.min(depth, result.depth.min);
            result.depth.max = Math.max(depth, result.depth.max);
            result.tris.min = Math.min(count, result.tris.min);
            result.tris.max = Math.max(count, result.tris.max);
            result.surfaceAreaScore += surfaceArea * TRIANGLE_INTERSECT_COST * count;
          } else {
            result.splits[offsetOrSplit]++;
            result.surfaceAreaScore += surfaceArea * TRAVERSAL_COST;
          }
        }, group);
        if (result.tris.min === Infinity) {
          result.tris.min = 0;
          result.tris.max = 0;
        }
        if (result.depth.min === Infinity) {
          result.depth.min = 0;
          result.depth.max = 0;
        }
        return result;
      }
      function getBVHExtremes(bvh) {
        return bvh._roots.map((root, i) => getRootExtremes(bvh, i));
      }
      function estimateMemoryInBytes(obj) {
        const traversed = /* @__PURE__ */ new Set();
        const stack = [obj];
        let bytes = 0;
        while (stack.length) {
          const curr = stack.pop();
          if (traversed.has(curr)) {
            continue;
          }
          traversed.add(curr);
          for (let key in curr) {
            if (!curr.hasOwnProperty(key)) {
              continue;
            }
            bytes += getPrimitiveSize(key);
            const value = curr[key];
            if (value && (typeof value === "object" || typeof value === "function")) {
              if (isTypedArray(value)) {
                bytes += value.byteLength;
              } else if (value instanceof ArrayBuffer) {
                bytes += value.byteLength;
              } else {
                stack.push(value);
              }
            } else {
              bytes += getPrimitiveSize(value);
            }
          }
        }
        return bytes;
      }
      function validateBounds(bvh) {
        const geometry = bvh.geometry;
        const depthStack = [];
        const index = geometry.index;
        const position = geometry.getAttribute("position");
        let passes = true;
        bvh.traverse((depth, isLeaf, boundingData, offset, count) => {
          const info = {
            depth,
            isLeaf,
            boundingData,
            offset,
            count
          };
          depthStack[depth] = info;
          arrayToBox(0, boundingData, _box1);
          const parent = depthStack[depth - 1];
          if (isLeaf) {
            for (let i = offset * 3, l = (offset + count) * 3; i < l; i += 3) {
              const i0 = index.getX(i);
              const i1 = index.getX(i + 1);
              const i2 = index.getX(i + 2);
              let isContained;
              _vec.fromBufferAttribute(position, i0);
              isContained = _box1.containsPoint(_vec);
              _vec.fromBufferAttribute(position, i1);
              isContained = isContained && _box1.containsPoint(_vec);
              _vec.fromBufferAttribute(position, i2);
              isContained = isContained && _box1.containsPoint(_vec);
              console.assert(isContained, "Leaf bounds does not fully contain triangle.");
              passes = passes && isContained;
            }
          }
          if (parent) {
            arrayToBox(0, boundingData, _box2);
            const isContained = _box2.containsBox(_box1);
            console.assert(isContained, "Parent bounds does not fully contain child.");
            passes = passes && isContained;
          }
        });
        return passes;
      }
      function getJSONStructure(bvh) {
        const depthStack = [];
        bvh.traverse((depth, isLeaf, boundingData, offset, count) => {
          const info = {
            bounds: arrayToBox(0, boundingData, new three.Box3())
          };
          if (isLeaf) {
            info.count = count;
            info.offset = offset;
          } else {
            info.left = null;
            info.right = null;
          }
          depthStack[depth] = info;
          const parent = depthStack[depth - 1];
          if (parent) {
            if (parent.left === null) {
              parent.left = info;
            } else {
              parent.right = info;
            }
          }
        });
        return depthStack[0];
      }
      const ray = /* @__PURE__ */ new three.Ray();
      const tmpInverseMatrix = /* @__PURE__ */ new three.Matrix4();
      const origMeshRaycastFunc = three.Mesh.prototype.raycast;
      function acceleratedRaycast(raycaster, intersects) {
        if (this.geometry.boundsTree) {
          if (this.material === void 0)
            return;
          tmpInverseMatrix.copy(this.matrixWorld).invert();
          ray.copy(raycaster.ray).applyMatrix4(tmpInverseMatrix);
          const bvh = this.geometry.boundsTree;
          if (raycaster.firstHitOnly === true) {
            const hit = convertRaycastIntersect(bvh.raycastFirst(ray, this.material), this, raycaster);
            if (hit) {
              intersects.push(hit);
            }
          } else {
            const hits = bvh.raycast(ray, this.material);
            for (let i = 0, l = hits.length; i < l; i++) {
              const hit = convertRaycastIntersect(hits[i], this, raycaster);
              if (hit) {
                intersects.push(hit);
              }
            }
          }
        } else {
          origMeshRaycastFunc.call(this, raycaster, intersects);
        }
      }
      function computeBoundsTree(options) {
        this.boundsTree = new MeshBVH(this, options);
        return this.boundsTree;
      }
      function disposeBoundsTree() {
        this.boundsTree = null;
      }
      function countToStringFormat(count) {
        switch (count) {
          case 1:
            return "R";
          case 2:
            return "RG";
          case 3:
            return "RGBA";
          case 4:
            return "RGBA";
        }
        throw new Error();
      }
      function countToFormat(count) {
        switch (count) {
          case 1:
            return three.RedFormat;
          case 2:
            return three.RGFormat;
          case 3:
            return three.RGBAFormat;
          case 4:
            return three.RGBAFormat;
        }
      }
      function countToIntFormat(count) {
        switch (count) {
          case 1:
            return three.RedIntegerFormat;
          case 2:
            return three.RGIntegerFormat;
          case 3:
            return three.RGBAIntegerFormat;
          case 4:
            return three.RGBAIntegerFormat;
        }
      }
      class VertexAttributeTexture extends three.DataTexture {
        constructor() {
          super();
          this.minFilter = three.NearestFilter;
          this.magFilter = three.NearestFilter;
          this.generateMipmaps = false;
          this.overrideItemSize = null;
          this._forcedType = null;
        }
        updateFrom(attr) {
          const overrideItemSize = this.overrideItemSize;
          const originalItemSize = attr.itemSize;
          const originalCount = attr.count;
          if (overrideItemSize !== null) {
            if (originalItemSize * originalCount % overrideItemSize !== 0) {
              throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");
            }
            attr.itemSize = overrideItemSize;
            attr.count = originalCount * originalItemSize / overrideItemSize;
          }
          const itemSize = attr.itemSize;
          const count = attr.count;
          const normalized = attr.normalized;
          const originalBufferCons = attr.array.constructor;
          const byteCount = originalBufferCons.BYTES_PER_ELEMENT;
          let targetType = this._forcedType;
          let finalStride = itemSize;
          if (targetType === null) {
            switch (originalBufferCons) {
              case Float32Array:
                targetType = three.FloatType;
                break;
              case Uint8Array:
              case Uint16Array:
              case Uint32Array:
                targetType = three.UnsignedIntType;
                break;
              case Int8Array:
              case Int16Array:
              case Int32Array:
                targetType = three.IntType;
                break;
            }
          }
          let type, format, normalizeValue, targetBufferCons;
          let internalFormat = countToStringFormat(itemSize);
          switch (targetType) {
            case three.FloatType:
              normalizeValue = 1;
              format = countToFormat(itemSize);
              if (normalized && byteCount === 1) {
                targetBufferCons = originalBufferCons;
                internalFormat += "8";
                if (originalBufferCons === Uint8Array) {
                  type = three.UnsignedByteType;
                } else {
                  type = three.ByteType;
                  internalFormat += "_SNORM";
                }
              } else {
                targetBufferCons = Float32Array;
                internalFormat += "32F";
                type = three.FloatType;
              }
              break;
            case three.IntType:
              internalFormat += byteCount * 8 + "I";
              normalizeValue = normalized ? Math.pow(2, originalBufferCons.BYTES_PER_ELEMENT * 8 - 1) : 1;
              format = countToIntFormat(itemSize);
              if (byteCount === 1) {
                targetBufferCons = Int8Array;
                type = three.ByteType;
              } else if (byteCount === 2) {
                targetBufferCons = Int16Array;
                type = three.ShortType;
              } else {
                targetBufferCons = Int32Array;
                type = three.IntType;
              }
              break;
            case three.UnsignedIntType:
              internalFormat += byteCount * 8 + "UI";
              normalizeValue = normalized ? Math.pow(2, originalBufferCons.BYTES_PER_ELEMENT * 8 - 1) : 1;
              format = countToIntFormat(itemSize);
              if (byteCount === 1) {
                targetBufferCons = Uint8Array;
                type = three.UnsignedByteType;
              } else if (byteCount === 2) {
                targetBufferCons = Uint16Array;
                type = three.UnsignedShortType;
              } else {
                targetBufferCons = Uint32Array;
                type = three.UnsignedIntType;
              }
              break;
          }
          if (finalStride === 3 && (format === three.RGBAFormat || format === three.RGBAIntegerFormat)) {
            finalStride = 4;
          }
          const dimension = Math.ceil(Math.sqrt(count));
          const length = finalStride * dimension * dimension;
          const dataArray = new targetBufferCons(length);
          for (let i = 0; i < count; i++) {
            const ii = finalStride * i;
            dataArray[ii] = attr.getX(i) / normalizeValue;
            if (itemSize >= 2) {
              dataArray[ii + 1] = attr.getY(i) / normalizeValue;
            }
            if (itemSize >= 3) {
              dataArray[ii + 2] = attr.getZ(i) / normalizeValue;
              if (finalStride === 4) {
                dataArray[ii + 3] = 1;
              }
            }
            if (itemSize >= 4) {
              dataArray[ii + 3] = attr.getW(i) / normalizeValue;
            }
          }
          this.internalFormat = internalFormat;
          this.format = format;
          this.type = type;
          this.image.width = dimension;
          this.image.height = dimension;
          this.image.data = dataArray;
          this.needsUpdate = true;
          this.dispose();
          attr.itemSize = originalItemSize;
          attr.count = originalCount;
        }
      }
      class UIntVertexAttributeTexture extends VertexAttributeTexture {
        constructor() {
          super();
          this._forcedType = three.UnsignedIntType;
        }
      }
      class IntVertexAttributeTexture extends VertexAttributeTexture {
        constructor() {
          super();
          this._forcedType = three.IntType;
        }
      }
      class FloatVertexAttributeTexture extends VertexAttributeTexture {
        constructor() {
          super();
          this._forcedType = three.FloatType;
        }
      }
      function bvhToTextures(bvh, boundsTexture, contentsTexture) {
        const roots = bvh._roots;
        if (roots.length !== 1) {
          throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");
        }
        const root = roots[0];
        const uint16Array = new Uint16Array(root);
        const uint32Array = new Uint32Array(root);
        const float32Array = new Float32Array(root);
        const nodeCount = root.byteLength / BYTES_PER_NODE;
        const boundsDimension = 2 * Math.ceil(Math.sqrt(nodeCount / 2));
        const boundsArray = new Float32Array(4 * boundsDimension * boundsDimension);
        const contentsDimension = Math.ceil(Math.sqrt(nodeCount));
        const contentsArray = new Uint32Array(2 * contentsDimension * contentsDimension);
        for (let i = 0; i < nodeCount; i++) {
          const nodeIndex32 = i * BYTES_PER_NODE / 4;
          const nodeIndex16 = nodeIndex32 * 2;
          const boundsIndex = BOUNDING_DATA_INDEX(nodeIndex32);
          for (let b = 0; b < 3; b++) {
            boundsArray[8 * i + 0 + b] = float32Array[boundsIndex + 0 + b];
            boundsArray[8 * i + 4 + b] = float32Array[boundsIndex + 3 + b];
          }
          if (IS_LEAF(nodeIndex16, uint16Array)) {
            const count = COUNT(nodeIndex16, uint16Array);
            const offset = OFFSET(nodeIndex32, uint32Array);
            const mergedLeafCount = 4294901760 | count;
            contentsArray[i * 2 + 0] = mergedLeafCount;
            contentsArray[i * 2 + 1] = offset;
          } else {
            const rightIndex = 4 * RIGHT_NODE(nodeIndex32, uint32Array) / BYTES_PER_NODE;
            const splitAxis = SPLIT_AXIS(nodeIndex32, uint32Array);
            contentsArray[i * 2 + 0] = splitAxis;
            contentsArray[i * 2 + 1] = rightIndex;
          }
        }
        boundsTexture.image.data = boundsArray;
        boundsTexture.image.width = boundsDimension;
        boundsTexture.image.height = boundsDimension;
        boundsTexture.format = three.RGBAFormat;
        boundsTexture.type = three.FloatType;
        boundsTexture.internalFormat = "RGBA32F";
        boundsTexture.minFilter = three.NearestFilter;
        boundsTexture.magFilter = three.NearestFilter;
        boundsTexture.generateMipmaps = false;
        boundsTexture.needsUpdate = true;
        boundsTexture.dispose();
        contentsTexture.image.data = contentsArray;
        contentsTexture.image.width = contentsDimension;
        contentsTexture.image.height = contentsDimension;
        contentsTexture.format = three.RGIntegerFormat;
        contentsTexture.type = three.UnsignedIntType;
        contentsTexture.internalFormat = "RG32UI";
        contentsTexture.minFilter = three.NearestFilter;
        contentsTexture.magFilter = three.NearestFilter;
        contentsTexture.generateMipmaps = false;
        contentsTexture.needsUpdate = true;
        contentsTexture.dispose();
      }
      class MeshBVHUniformStruct {
        constructor() {
          this.autoDispose = true;
          this.index = new UIntVertexAttributeTexture();
          this.position = new FloatVertexAttributeTexture();
          this.bvhBounds = new three.DataTexture();
          this.bvhContents = new three.DataTexture();
          this.index.overrideItemSize = 3;
        }
        updateFrom(bvh) {
          const { geometry } = bvh;
          bvhToTextures(bvh, this.bvhBounds, this.bvhContents);
          this.index.updateFrom(geometry.index);
          this.position.updateFrom(geometry.attributes.position);
        }
        dispose() {
          const { index, position, bvhBounds, bvhContents } = this;
          if (index)
            index.dispose();
          if (position)
            position.dispose();
          if (bvhBounds)
            bvhBounds.dispose();
          if (bvhContents)
            bvhContents.dispose();
        }
      }
      const shaderStructs = `
#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};

// Note that a struct cannot be used for the hit record including faceIndices, faceNormal, barycoord,
// side, and dist because on some mobile GPUS (such as Adreno) numbers are afforded less precision specifically
// when in a struct leading to inaccurate hit results. See KhronosGroup/WebGL#3351 for more details.
`;
      const shaderIntersectFunction = `

uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}

float intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	float dist = max( t0, 0.0 );

	return t1 >= dist ? dist : INFINITY;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	BVH bvh, vec3 rayOrigin, vec3 rayDirection, uint offset, uint count,
	inout float minDistance,

	// output variables
	out uvec4 faceIndices, out vec3 faceNormal, out vec3 barycoord,
	out float side, out float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( bvh.index, i ).xyz;
		vec3 a = texelFetch1D( bvh.position, indices.x ).rgb;
		vec3 b = texelFetch1D( bvh.position, indices.y ).rgb;
		vec3 c = texelFetch1D( bvh.position, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

float intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, BVH bvh, uint currNodeIndex ) {

	vec3 boundsMin = texelFetch1D( bvh.bvhBounds, currNodeIndex * 2u + 0u ).xyz;
	vec3 boundsMax = texelFetch1D( bvh.bvhBounds, currNodeIndex * 2u + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax );

}

bool bvhIntersectFirstHit(
	BVH bvh, vec3 rayOrigin, vec3 rayDirection,

	// output variables
	out uvec4 faceIndices, out vec3 faceNormal, out vec3 barycoord,
	out float side, out float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ 60 ];
	stack[ 0 ] = 0u;

	float triangleDistance = 1e20;
	bool found = false;
	while ( ptr > - 1 && ptr < 60 ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance = intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh, currNodeIndex );
		if ( boundsHitDistance == INFINITY || boundsHitDistance > triangleDistance ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh.bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh, rayOrigin, rayDirection, offset, count, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}

`;
      const _positionVector = /* @__PURE__ */ new three.Vector3();
      const _normalVector = /* @__PURE__ */ new three.Vector3();
      const _tangentVector = /* @__PURE__ */ new three.Vector3();
      const _tangentVector4 = /* @__PURE__ */ new three.Vector4();
      const _morphVector = /* @__PURE__ */ new three.Vector3();
      const _temp = /* @__PURE__ */ new three.Vector3();
      const _skinIndex = /* @__PURE__ */ new three.Vector4();
      const _skinWeight = /* @__PURE__ */ new three.Vector4();
      const _matrix = /* @__PURE__ */ new three.Matrix4();
      const _boneMatrix = /* @__PURE__ */ new three.Matrix4();
      function validateAttributes(attr1, attr2) {
        if (!attr1 && !attr2) {
          return;
        }
        const sameCount = attr1.count === attr2.count;
        const sameNormalized = attr1.normalized === attr2.normalized;
        const sameType = attr1.array.constructor === attr2.array.constructor;
        const sameItemSize = attr1.itemSize === attr2.itemSize;
        if (!sameCount || !sameNormalized || !sameType || !sameItemSize) {
          throw new Error();
        }
      }
      function createAttributeClone(attr, countOverride = null) {
        const cons = attr.array.constructor;
        const normalized = attr.normalized;
        const itemSize = attr.itemSize;
        const count = countOverride === null ? attr.count : countOverride;
        return new three.BufferAttribute(new cons(itemSize * count), itemSize, normalized);
      }
      function copyAttributeContents(attr, target, targetOffset = 0) {
        if (attr.isInterleavedBufferAttribute) {
          const itemSize = attr.itemSize;
          for (let i = 0, l = attr.count; i < l; i++) {
            const io = i + targetOffset;
            target.setX(io, attr.getX(i));
            if (itemSize >= 2)
              target.setY(io, attr.getY(i));
            if (itemSize >= 3)
              target.setZ(io, attr.getZ(i));
            if (itemSize >= 4)
              target.setW(io, attr.getW(i));
          }
        } else {
          const array = target.array;
          const cons = array.constructor;
          const byteOffset = array.BYTES_PER_ELEMENT * attr.itemSize * targetOffset;
          const temp5 = new cons(array.buffer, byteOffset, attr.array.length);
          temp5.set(attr.array);
        }
      }
      function addScaledMatrix(target, matrix, scale) {
        const targetArray = target.elements;
        const matrixArray = matrix.elements;
        for (let i = 0, l = matrixArray.length; i < l; i++) {
          targetArray[i] += matrixArray[i] * scale;
        }
      }
      function boneNormalTransform(mesh, index, target) {
        const skeleton = mesh.skeleton;
        const geometry = mesh.geometry;
        const bones = skeleton.bones;
        const boneInverses = skeleton.boneInverses;
        _skinIndex.fromBufferAttribute(geometry.attributes.skinIndex, index);
        _skinWeight.fromBufferAttribute(geometry.attributes.skinWeight, index);
        _matrix.elements.fill(0);
        for (let i = 0; i < 4; i++) {
          const weight = _skinWeight.getComponent(i);
          if (weight !== 0) {
            const boneIndex = _skinIndex.getComponent(i);
            _boneMatrix.multiplyMatrices(bones[boneIndex].matrixWorld, boneInverses[boneIndex]);
            addScaledMatrix(_matrix, _boneMatrix, weight);
          }
        }
        _matrix.multiply(mesh.bindMatrix).premultiply(mesh.bindMatrixInverse);
        target.transformDirection(_matrix);
        return target;
      }
      function applyMorphTarget(morphData, morphInfluences, morphTargetsRelative, i, target) {
        _morphVector.set(0, 0, 0);
        for (let j = 0, jl = morphData.length; j < jl; j++) {
          const influence = morphInfluences[j];
          const morphAttribute = morphData[j];
          if (influence === 0)
            continue;
          _temp.fromBufferAttribute(morphAttribute, i);
          if (morphTargetsRelative) {
            _morphVector.addScaledVector(_temp, influence);
          } else {
            _morphVector.addScaledVector(_temp.sub(target), influence);
          }
        }
        target.add(_morphVector);
      }
      function mergeBufferGeometries(geometries, options = { useGroups: false, updateIndex: false }, targetGeometry = new three.BufferGeometry()) {
        const isIndexed = geometries[0].index !== null;
        const { useGroups, updateIndex } = options;
        const attributesUsed = new Set(Object.keys(geometries[0].attributes));
        const attributes = {};
        let offset = 0;
        for (let i = 0; i < geometries.length; ++i) {
          const geometry = geometries[i];
          let attributesCount = 0;
          if (isIndexed !== (geometry.index !== null)) {
            throw new Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");
          }
          for (const name in geometry.attributes) {
            if (!attributesUsed.has(name)) {
              throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.');
            }
            if (attributes[name] === void 0) {
              attributes[name] = [];
            }
            attributes[name].push(geometry.attributes[name]);
            attributesCount++;
          }
          if (attributesCount !== attributesUsed.size) {
            throw new Error("StaticGeometryGenerator: Make sure all geometries have the same number of attributes.");
          }
          if (useGroups) {
            let count;
            if (isIndexed) {
              count = geometry.index.count;
            } else if (geometry.attributes.position !== void 0) {
              count = geometry.attributes.position.count;
            } else {
              throw new Error("StaticGeometryGenerator: The geometry must have either an index or a position attribute");
            }
            targetGeometry.addGroup(offset, count, i);
            offset += count;
          }
        }
        if (isIndexed) {
          let forceUpateIndex = false;
          if (!targetGeometry.index) {
            let indexCount = 0;
            for (let i = 0; i < geometries.length; ++i) {
              indexCount += geometries[i].index.count;
            }
            targetGeometry.setIndex(new three.BufferAttribute(new Uint32Array(indexCount), 1, false));
            forceUpateIndex = true;
          }
          if (updateIndex || forceUpateIndex) {
            const targetIndex = targetGeometry.index;
            let targetOffset = 0;
            let indexOffset = 0;
            for (let i = 0; i < geometries.length; ++i) {
              const geometry = geometries[i];
              const index = geometry.index;
              for (let j = 0; j < index.count; ++j) {
                targetIndex.setX(targetOffset, index.getX(j) + indexOffset);
                targetOffset++;
              }
              indexOffset += geometry.attributes.position.count;
            }
          }
        }
        for (const name in attributes) {
          const attrList = attributes[name];
          if (!(name in targetGeometry.attributes)) {
            let count = 0;
            for (const key in attrList) {
              count += attrList[key].count;
            }
            targetGeometry.setAttribute(name, createAttributeClone(attributes[name][0], count));
          }
          const targetAttribute = targetGeometry.attributes[name];
          let offset2 = 0;
          for (const key in attrList) {
            const attr = attrList[key];
            copyAttributeContents(attr, targetAttribute, offset2);
            offset2 += attr.count;
          }
        }
        return targetGeometry;
      }
      class StaticGeometryGenerator {
        constructor(meshes) {
          if (!Array.isArray(meshes)) {
            meshes = [meshes];
          }
          const finalMeshes = [];
          meshes.forEach((object) => {
            object.traverse((c) => {
              if (c.isMesh) {
                finalMeshes.push(c);
              }
            });
          });
          this.meshes = finalMeshes;
          this.useGroups = true;
          this.applyWorldTransforms = true;
          this.attributes = ["position", "normal", "tangent", "uv", "uv2"];
          this._intermediateGeometry = new Array(finalMeshes.length).fill().map(() => new three.BufferGeometry());
        }
        getMaterials() {
          const materials = [];
          this.meshes.forEach((mesh) => {
            if (Array.isArray(mesh.material)) {
              materials.push(...mesh.material);
            } else {
              materials.push(mesh.material);
            }
          });
          return materials;
        }
        generate(targetGeometry = new three.BufferGeometry()) {
          const { meshes, useGroups, _intermediateGeometry } = this;
          for (let i = 0, l = meshes.length; i < l; i++) {
            const mesh = meshes[i];
            const geom = _intermediateGeometry[i];
            this._convertToStaticGeometry(mesh, geom);
          }
          mergeBufferGeometries(_intermediateGeometry, { useGroups }, targetGeometry);
          for (const key in targetGeometry.attributes) {
            targetGeometry.attributes[key].needsUpdate = true;
          }
          return targetGeometry;
        }
        _convertToStaticGeometry(mesh, targetGeometry = new three.BufferGeometry()) {
          const geometry = mesh.geometry;
          const applyWorldTransforms = this.applyWorldTransforms;
          const includeNormal = this.attributes.includes("normal");
          const includeTangent = this.attributes.includes("tangent");
          const attributes = geometry.attributes;
          const targetAttributes = targetGeometry.attributes;
          if (!targetGeometry.index) {
            targetGeometry.index = geometry.index;
          }
          if (!targetAttributes.position) {
            targetGeometry.setAttribute("position", createAttributeClone(attributes.position));
          }
          if (includeNormal && !targetAttributes.normal && attributes.normal) {
            targetGeometry.setAttribute("normal", createAttributeClone(attributes.normal));
          }
          if (includeTangent && !targetAttributes.tangent && attributes.tangent) {
            targetGeometry.setAttribute("tangent", createAttributeClone(attributes.tangent));
          }
          validateAttributes(geometry.index, targetGeometry.index);
          validateAttributes(attributes.position, targetAttributes.position);
          if (includeNormal) {
            validateAttributes(attributes.normal, targetAttributes.normal);
          }
          if (includeTangent) {
            validateAttributes(attributes.tangent, targetAttributes.tangent);
          }
          const position = attributes.position;
          const normal = includeNormal ? attributes.normal : null;
          const tangent = includeTangent ? attributes.tangent : null;
          const morphPosition = geometry.morphAttributes.position;
          const morphNormal = geometry.morphAttributes.normal;
          const morphTangent = geometry.morphAttributes.tangent;
          const morphTargetsRelative = geometry.morphTargetsRelative;
          const morphInfluences = mesh.morphTargetInfluences;
          const normalMatrix = new three.Matrix3();
          normalMatrix.getNormalMatrix(mesh.matrixWorld);
          for (let i = 0, l = attributes.position.count; i < l; i++) {
            _positionVector.fromBufferAttribute(position, i);
            if (normal) {
              _normalVector.fromBufferAttribute(normal, i);
            }
            if (tangent) {
              _tangentVector4.fromBufferAttribute(tangent, i);
              _tangentVector.fromBufferAttribute(tangent, i);
            }
            if (morphInfluences) {
              if (morphPosition) {
                applyMorphTarget(morphPosition, morphInfluences, morphTargetsRelative, i, _positionVector);
              }
              if (morphNormal) {
                applyMorphTarget(morphNormal, morphInfluences, morphTargetsRelative, i, _normalVector);
              }
              if (morphTangent) {
                applyMorphTarget(morphTangent, morphInfluences, morphTargetsRelative, i, _tangentVector);
              }
            }
            if (mesh.isSkinnedMesh) {
              mesh.boneTransform(i, _positionVector);
              if (normal) {
                boneNormalTransform(mesh, i, _normalVector);
              }
              if (tangent) {
                boneNormalTransform(mesh, i, _tangentVector);
              }
            }
            if (applyWorldTransforms) {
              _positionVector.applyMatrix4(mesh.matrixWorld);
            }
            targetAttributes.position.setXYZ(i, _positionVector.x, _positionVector.y, _positionVector.z);
            if (normal) {
              if (applyWorldTransforms) {
                _normalVector.applyNormalMatrix(normalMatrix);
              }
              targetAttributes.normal.setXYZ(i, _normalVector.x, _normalVector.y, _normalVector.z);
            }
            if (tangent) {
              if (applyWorldTransforms) {
                _tangentVector.transformDirection(mesh.matrixWorld);
              }
              targetAttributes.tangent.setXYZW(i, _tangentVector.x, _tangentVector.y, _tangentVector.z, _tangentVector4.w);
            }
          }
          for (const i in this.attributes) {
            const key = this.attributes[i];
            if (key === "position" || key === "tangent" || key === "normal" || !(key in attributes)) {
              continue;
            }
            if (!targetAttributes[key]) {
              targetGeometry.setAttribute(key, createAttributeClone(attributes[key]));
            }
            validateAttributes(attributes[key], targetAttributes[key]);
            copyAttributeContents(attributes[key], targetAttributes[key]);
          }
          return targetGeometry;
        }
      }
      exports2.AVERAGE = AVERAGE;
      exports2.CENTER = CENTER;
      exports2.CONTAINED = CONTAINED;
      exports2.ExtendedTriangle = ExtendedTriangle;
      exports2.FloatVertexAttributeTexture = FloatVertexAttributeTexture;
      exports2.INTERSECTED = INTERSECTED;
      exports2.IntVertexAttributeTexture = IntVertexAttributeTexture;
      exports2.MeshBVH = MeshBVH;
      exports2.MeshBVHUniformStruct = MeshBVHUniformStruct;
      exports2.MeshBVHVisualizer = MeshBVHVisualizer;
      exports2.NOT_INTERSECTED = NOT_INTERSECTED;
      exports2.OrientedBox = OrientedBox;
      exports2.SAH = SAH;
      exports2.StaticGeometryGenerator = StaticGeometryGenerator;
      exports2.UIntVertexAttributeTexture = UIntVertexAttributeTexture;
      exports2.VertexAttributeTexture = VertexAttributeTexture;
      exports2.acceleratedRaycast = acceleratedRaycast;
      exports2.computeBoundsTree = computeBoundsTree;
      exports2.disposeBoundsTree = disposeBoundsTree;
      exports2.estimateMemoryInBytes = estimateMemoryInBytes;
      exports2.getBVHExtremes = getBVHExtremes;
      exports2.getJSONStructure = getJSONStructure;
      exports2.getTriangleHitPointInfo = getTriangleHitPointInfo;
      exports2.shaderIntersectFunction = shaderIntersectFunction;
      exports2.shaderStructs = shaderStructs;
      exports2.validateBounds = validateBounds;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/@react-three/drei/index.cjs.js
var require_index_cjs = __commonJS({
  "node_modules/@react-three/drei/index.cjs.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var e = require("@babel/runtime/helpers/extends");
    var t = require("react");
    var r = require("react-dom/client");
    var n = require("three");
    var o = require("@react-three/fiber");
    var a = require("zustand");
    var i = require("react-merge-refs");
    var s = require("@react-spring/three");
    var c = require("@use-gesture/react");
    var l = require("three-stdlib");
    var u = require("zustand/shallow");
    var d = require("troika-three-text");
    var m = require("suspend-react");
    var f = require("meshline");
    var p = require("lodash.pick");
    var h = require("lodash.omit");
    var v = require("stats.js");
    var g = require("detect-gpu");
    var x = require_index_umd();
    var y = require("react-composer");
    function E(e2) {
      return e2 && typeof e2 == "object" && "default" in e2 ? e2 : { default: e2 };
    }
    function w(e2) {
      if (e2 && e2.__esModule)
        return e2;
      var t2 = /* @__PURE__ */ Object.create(null);
      return e2 && Object.keys(e2).forEach(function(r2) {
        if (r2 !== "default") {
          var n2 = Object.getOwnPropertyDescriptor(e2, r2);
          Object.defineProperty(t2, r2, n2.get ? n2 : { enumerable: true, get: function() {
            return e2[r2];
          } });
        }
      }), t2.default = e2, Object.freeze(t2);
    }
    var b = E(e);
    var M = w(t);
    var S = w(r);
    var T = w(n);
    var P = E(a);
    var C = E(i);
    var R = E(u);
    var _ = E(p);
    var L = E(h);
    var D = E(v);
    var z = E(y);
    var A = new n.Vector3();
    var F = new n.Vector3();
    var B = new n.Vector3();
    function k(e2, t2, r2) {
      const n2 = A.setFromMatrixPosition(e2.matrixWorld);
      n2.project(t2);
      const o2 = r2.width / 2, a2 = r2.height / 2;
      return [n2.x * o2 + o2, -n2.y * a2 + a2];
    }
    var U = (e2) => Math.abs(e2) < 1e-10 ? 0 : e2;
    function j(e2, t2, r2 = "") {
      let n2 = "matrix3d(";
      for (let r3 = 0; r3 !== 16; r3++)
        n2 += U(t2[r3] * e2.elements[r3]) + (r3 !== 15 ? "," : ")");
      return r2 + n2;
    }
    var V = (O = [1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1], (e2) => j(e2, O));
    var O;
    var I = (e2, t2) => {
      return j(e2, [1 / (r2 = t2), 1 / r2, 1 / r2, 1, -1 / r2, -1 / r2, -1 / r2, -1, 1 / r2, 1 / r2, 1 / r2, 1, 1, 1, 1, 1], "translate(-50%,-50%)");
      var r2;
    };
    var W = M.forwardRef((_a, w2) => {
      var _b = _a, { children: e2, eps: t2 = 1e-3, style: r2, className: a2, prepend: i2, center: s2, fullscreen: c2, portal: l2, distanceFactor: u2, sprite: d2 = false, transform: m2 = false, occlude: f2, onOcclude: p2, zIndexRange: h2 = [16777271, 0], calculatePosition: v2 = k, as: g2 = "div", wrapperClass: x2, pointerEvents: y2 = "auto" } = _b, E2 = __objRest(_b, ["children", "eps", "style", "className", "prepend", "center", "fullscreen", "portal", "distanceFactor", "sprite", "transform", "occlude", "onOcclude", "zIndexRange", "calculatePosition", "as", "wrapperClass", "pointerEvents"]);
      var T2;
      const P2 = o.useThree(({ gl: e3 }) => e3), C2 = o.useThree(({ camera: e3 }) => e3), R2 = o.useThree(({ scene: e3 }) => e3), _2 = o.useThree(({ size: e3 }) => e3), L2 = o.useThree(({ raycaster: e3 }) => e3), [D2] = M.useState(() => document.createElement(g2)), z2 = M.useMemo(() => S.createRoot(D2), [D2]), j2 = M.useRef(null), O2 = M.useRef(0), W2 = M.useRef([0, 0]), N2 = M.useRef(null), G2 = M.useRef(null), H2 = (T2 = l2 == null ? void 0 : l2.current) !== null && T2 !== void 0 ? T2 : P2.domElement.parentNode;
      M.useEffect(() => {
        if (j2.current) {
          if (R2.updateMatrixWorld(), m2)
            D2.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";
          else {
            const e3 = v2(j2.current, C2, _2);
            D2.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${e3[0]}px,${e3[1]}px,0);transform-origin:0 0;`;
          }
          return H2 && (i2 ? H2.prepend(D2) : H2.appendChild(D2)), () => {
            H2 && H2.removeChild(D2), z2.unmount();
          };
        }
      }, [H2, m2]), M.useLayoutEffect(() => {
        x2 && (D2.className = x2);
      }, [x2]);
      const $2 = M.useMemo(() => m2 ? { position: "absolute", top: 0, left: 0, width: _2.width, height: _2.height, transformStyle: "preserve-3d", pointerEvents: "none" } : __spreadValues(__spreadValues({ position: "absolute", transform: s2 ? "translate3d(-50%,-50%,0)" : "none" }, c2 && { top: -_2.height / 2, left: -_2.width / 2, width: _2.width, height: _2.height }), r2), [r2, s2, c2, _2, m2]), q2 = M.useMemo(() => ({ position: "absolute", pointerEvents: y2 }), [y2]);
      M.useLayoutEffect(() => {
        m2 ? z2.render(M.createElement("div", { ref: N2, style: $2 }, M.createElement("div", { ref: G2, style: q2 }, M.createElement("div", { ref: w2, className: a2, style: r2, children: e2 })))) : z2.render(M.createElement("div", { ref: w2, style: $2, className: a2, children: e2 }));
      });
      const X2 = M.useRef(true);
      return o.useFrame(() => {
        if (j2.current) {
          C2.updateMatrixWorld(), j2.current.updateWorldMatrix(true, false);
          const e3 = m2 ? W2.current : v2(j2.current, C2, _2);
          if (m2 || Math.abs(O2.current - C2.zoom) > t2 || Math.abs(W2.current[0] - e3[0]) > t2 || Math.abs(W2.current[1] - e3[1]) > t2) {
            const t3 = function(e4, t4) {
              const r4 = A.setFromMatrixPosition(e4.matrixWorld), n2 = F.setFromMatrixPosition(t4.matrixWorld), o3 = r4.sub(n2), a3 = t4.getWorldDirection(B);
              return o3.angleTo(a3) > Math.PI / 2;
            }(j2.current, C2);
            let r3 = false;
            typeof f2 == "boolean" ? f2 === true && (r3 = [R2]) : Array.isArray(f2) && (r3 = f2.map((e4) => e4.current));
            const o2 = X2.current;
            if (r3) {
              const e4 = function(e5, t4, r4, n2) {
                const o3 = A.setFromMatrixPosition(e5.matrixWorld), a3 = o3.clone();
                a3.project(t4), r4.setFromCamera(a3, t4);
                const i3 = r4.intersectObjects(n2, true);
                if (i3.length) {
                  const e6 = i3[0].distance;
                  return o3.distanceTo(r4.ray.origin) < e6;
                }
                return true;
              }(j2.current, C2, L2, r3);
              X2.current = e4 && !t3;
            } else
              X2.current = !t3;
            if (o2 !== X2.current && (p2 ? p2(!X2.current) : D2.style.display = X2.current ? "block" : "none"), D2.style.zIndex = `${function(e4, t4, r4) {
              if (t4 instanceof n.PerspectiveCamera || t4 instanceof n.OrthographicCamera) {
                const n2 = A.setFromMatrixPosition(e4.matrixWorld), o3 = F.setFromMatrixPosition(t4.matrixWorld), a3 = n2.distanceTo(o3), i3 = (r4[1] - r4[0]) / (t4.far - t4.near), s3 = r4[1] - i3 * t4.far;
                return Math.round(i3 * a3 + s3);
              }
            }(j2.current, C2, h2)}`, m2) {
              const [e4, t4] = [_2.width / 2, _2.height / 2], r4 = C2.projectionMatrix.elements[5] * t4, { isOrthographicCamera: n2, top: o3, left: a3, bottom: i3, right: s3 } = C2, c3 = V(C2.matrixWorldInverse), l3 = n2 ? `scale(${r4})translate(${U(-(s3 + a3) / 2)}px,${U((o3 + i3) / 2)}px)` : `translateZ(${r4}px)`;
              let m3 = j2.current.matrixWorld;
              d2 && (m3 = C2.matrixWorldInverse.clone().transpose().copyPosition(m3).scale(j2.current.scale), m3.elements[3] = m3.elements[7] = m3.elements[11] = 0, m3.elements[15] = 1), D2.style.width = _2.width + "px", D2.style.height = _2.height + "px", D2.style.perspective = n2 ? "" : `${r4}px`, N2.current && G2.current && (N2.current.style.transform = `${l3}${c3}translate(${e4}px,${t4}px)`, G2.current.style.transform = I(m3, 1 / ((u2 || 10) / 400)));
            } else {
              const t4 = u2 === void 0 ? 1 : function(e4, t5) {
                if (t5 instanceof n.OrthographicCamera)
                  return t5.zoom;
                if (t5 instanceof n.PerspectiveCamera) {
                  const r4 = A.setFromMatrixPosition(e4.matrixWorld), n2 = F.setFromMatrixPosition(t5.matrixWorld), o3 = t5.fov * Math.PI / 180, a3 = r4.distanceTo(n2);
                  return 1 / (2 * Math.tan(o3 / 2) * a3);
                }
                return 1;
              }(j2.current, C2) * u2;
              D2.style.transform = `translate3d(${e3[0]}px,${e3[1]}px,0) scale(${t4})`;
            }
            W2.current = e3, O2.current = C2.zoom;
          }
        }
      }), M.createElement("group", b.default({}, E2, { ref: j2 }));
    });
    var N = 0;
    var G = P.default((e2) => (n.DefaultLoadingManager.onStart = (t2, r2, n2) => {
      e2({ active: true, item: t2, loaded: r2, total: n2, progress: (r2 - N) / (n2 - N) * 100 });
    }, n.DefaultLoadingManager.onLoad = () => {
      e2({ active: false });
    }, n.DefaultLoadingManager.onError = (t2) => e2((e3) => ({ errors: [...e3.errors, t2] })), n.DefaultLoadingManager.onProgress = (t2, r2, n2) => {
      r2 === n2 && (N = n2), e2({ active: true, item: t2, loaded: r2, total: n2, progress: (r2 - N) / (n2 - N) * 100 || 100 });
    }, { errors: [], active: false, progress: 0, item: "", loaded: 0, total: 0 }));
    var H = (e2) => `Loading ${e2.toFixed(2)}%`;
    var $ = { container: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#171717", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 300ms ease", zIndex: 1e3 }, inner: { width: 100, height: 3, background: "#272727", textAlign: "center" }, bar: { height: 3, width: "100%", background: "white", transition: "transform 200ms", transformOrigin: "left center" }, data: { display: "inline-block", position: "relative", fontVariantNumeric: "tabular-nums", marginTop: "0.8em", color: "#f0f0f0", fontSize: "0.6em", fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Helvetica Neue", Helvetica, Arial, Roboto, Ubuntu, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', whiteSpace: "nowrap" } };
    var q = M.createContext(null);
    function X() {
      return M.useContext(q);
    }
    var Y = M.forwardRef(({ children: e2 }, t2) => {
      const r2 = M.useRef(null), n2 = X(), { width: a2, height: i2 } = o.useThree((e3) => e3.viewport);
      return o.useFrame(() => {
        r2.current.position.x = n2.horizontal ? -a2 * (n2.pages - 1) * n2.offset : 0, r2.current.position.y = n2.horizontal ? 0 : i2 * (n2.pages - 1) * n2.offset;
      }), M.createElement("group", { ref: C.default([t2, r2]) }, e2);
    });
    var Z = M.forwardRef((_a, n2) => {
      var _b = _a, { children: e2, style: t2 } = _b, r2 = __objRest(_b, ["children", "style"]);
      const a2 = X(), i2 = M.useRef(null), { width: s2, height: c2 } = o.useThree((e3) => e3.size), l2 = M.useContext(o.context), u2 = M.useMemo(() => S.createRoot(a2.fixed), [a2.fixed]);
      return o.useFrame(() => {
        a2.delta > a2.eps && (i2.current.style.transform = `translate3d(${a2.horizontal ? -s2 * (a2.pages - 1) * a2.offset : 0}px,${a2.horizontal ? 0 : c2 * (a2.pages - 1) * -a2.offset}px,0)`);
      }), u2.render(M.createElement("div", b.default({ ref: C.default([n2, i2]), style: __spreadProps(__spreadValues({}, t2), { position: "absolute", top: 0, left: 0, willChange: "transform" }) }, r2), M.createElement(q.Provider, { value: a2 }, M.createElement(o.context.Provider, { value: l2 }, e2)))), null;
    });
    var K = M.forwardRef((_a, r2) => {
      var _b = _a, { html: e2 } = _b, t2 = __objRest(_b, ["html"]);
      const n2 = e2 ? Z : Y;
      return M.createElement(n2, b.default({ ref: r2 }, t2));
    });
    var J = M.createContext([]);
    var Q = M.forwardRef(function(_a, i2) {
      var _b = _a, { follow: e2 = true, lockX: t2 = false, lockY: r2 = false, lockZ: n2 = false } = _b, a2 = __objRest(_b, ["follow", "lockX", "lockY", "lockZ"]);
      const s2 = M.useRef();
      return o.useFrame(({ camera: o2 }) => {
        if (!e2 || !s2.current)
          return;
        const a3 = s2.current.rotation.clone();
        s2.current.quaternion.copy(o2.quaternion), t2 && (s2.current.rotation.x = a3.x), r2 && (s2.current.rotation.y = a3.y), n2 && (s2.current.rotation.z = a3.z);
      }), M.createElement("group", b.default({ ref: C.default([s2, i2]) }, a2));
    });
    var ee = M.forwardRef(function(_a, s2) {
      var _b = _a, { points: e2, color: t2 = "black", vertexColors: r2, lineWidth: o2, dashed: a2 } = _b, i2 = __objRest(_b, ["points", "color", "vertexColors", "lineWidth", "dashed"]);
      const [c2] = M.useState(() => new l.Line2()), [u2] = M.useState(() => new l.LineMaterial()), [d2] = M.useState(() => new n.Vector2(512, 512)), m2 = M.useMemo(() => {
        const t3 = new l.LineGeometry(), o3 = e2.map((e3) => e3 instanceof n.Vector3 ? e3.toArray() : e3);
        if (t3.setPositions(o3.flat()), r2) {
          const e3 = r2.map((e4) => e4 instanceof n.Color ? e4.toArray() : e4);
          t3.setColors(e3.flat());
        }
        return t3;
      }, [e2, r2]);
      return M.useLayoutEffect(() => {
        c2.computeLineDistances();
      }, [e2, c2]), M.useLayoutEffect(() => {
        a2 ? u2.defines.USE_DASH = "" : delete u2.defines.USE_DASH, u2.needsUpdate = true;
      }, [a2, u2]), M.useEffect(() => () => m2.dispose(), [m2]), M.createElement("primitive", b.default({ object: c2, ref: s2 }, i2), M.createElement("primitive", { object: m2, attach: "geometry" }), M.createElement("primitive", b.default({ object: u2, attach: "material", color: t2, vertexColors: Boolean(r2), resolution: d2, linewidth: o2, dashed: a2 }, i2)));
    });
    var te = new n.Vector3();
    var re = M.forwardRef(function(_a, i2) {
      var _b = _a, { start: e2 = [0, 0, 0], end: t2 = [0, 0, 0], mid: r2, segments: o2 = 20 } = _b, a2 = __objRest(_b, ["start", "end", "mid", "segments"]);
      const s2 = M.useRef(null), [c2] = M.useState(() => new n.QuadraticBezierCurve3(void 0, void 0, void 0)), l2 = M.useCallback((e3, t3, r3, o3 = 20) => (e3 instanceof n.Vector3 ? c2.v0.copy(e3) : c2.v0.set(...e3), t3 instanceof n.Vector3 ? c2.v2.copy(t3) : c2.v2.set(...t3), r3 instanceof n.Vector3 ? c2.v1.copy(r3) : c2.v1.copy(c2.v0.clone().add(c2.v2.clone().sub(c2.v0)).add(te.set(0, c2.v0.y - c2.v2.y, 0))), c2.getPoints(o3)), []);
      M.useLayoutEffect(() => {
        s2.current.setPoints = (e3, t3, r3) => {
          const n2 = l2(e3, t3, r3);
          s2.current.geometry && s2.current.geometry.setPositions(n2.map((e4) => e4.toArray()).flat());
        };
      }, []);
      const u2 = M.useMemo(() => l2(e2, t2, r2, o2), [e2, t2, r2, o2]);
      return M.createElement(ee, b.default({ ref: C.default([s2, i2]), points: u2 }, a2));
    });
    var ne = M.forwardRef(function(_a, s2) {
      var _b = _a, { start: e2, end: t2, midA: r2, midB: o2, segments: a2 = 20 } = _b, i2 = __objRest(_b, ["start", "end", "midA", "midB", "segments"]);
      const c2 = M.useMemo(() => {
        const i3 = e2 instanceof n.Vector3 ? e2 : new n.Vector3(...e2), s3 = t2 instanceof n.Vector3 ? t2 : new n.Vector3(...t2), c3 = r2 instanceof n.Vector3 ? r2 : new n.Vector3(...r2), l2 = o2 instanceof n.Vector3 ? o2 : new n.Vector3(...o2);
        return new n.CubicBezierCurve3(i3, c3, l2, s3).getPoints(a2);
      }, [e2, t2, r2, o2, a2]);
      return M.createElement(ee, b.default({ ref: s2, points: c2 }, i2));
    });
    var oe = M.forwardRef((_a, s2) => {
      var _b = _a, { url: e2, distance: t2 = 1, loop: r2 = true, autoplay: a2 } = _b, i2 = __objRest(_b, ["url", "distance", "loop", "autoplay"]);
      const c2 = M.useRef(), l2 = o.useThree(({ camera: e3 }) => e3), [u2] = M.useState(() => new n.AudioListener()), d2 = o.useLoader(n.AudioLoader, e2);
      return M.useEffect(() => {
        const e3 = c2.current;
        e3 && (e3.setBuffer(d2), e3.setRefDistance(t2), e3.setLoop(r2), a2 && !e3.isPlaying && e3.play());
      }, [d2, l2, t2, r2]), M.useEffect(() => {
        const e3 = c2.current;
        return l2.add(u2), () => {
          l2.remove(u2), e3 && (e3.isPlaying && e3.stop(), e3.source && e3.source._connected && e3.disconnect());
        };
      }, []), M.createElement("positionalAudio", b.default({ ref: C.default([c2, s2]), args: [u2] }, i2));
    });
    var ae = M.forwardRef((_a, c2) => {
      var _b = _a, { anchorX: e2 = "center", anchorY: t2 = "middle", font: r2, children: n2, characters: a2, onSync: i2 } = _b, s2 = __objRest(_b, ["anchorX", "anchorY", "font", "children", "characters", "onSync"]);
      const l2 = o.useThree(({ invalidate: e3 }) => e3), [u2] = M.useState(() => new d.Text()), [f2, p2] = M.useMemo(() => {
        const e3 = [];
        let t3 = "";
        return M.Children.forEach(n2, (r3) => {
          typeof r3 == "string" || typeof r3 == "number" ? t3 += r3 : e3.push(r3);
        }), [e3, t3];
      }, [n2]);
      return m.suspend(() => new Promise((e3) => d.preloadFont({ font: r2, characters: a2 }, e3)), ["troika-text", r2, a2]), M.useLayoutEffect(() => {
        u2.sync(() => {
          l2(), i2 && i2(u2);
        });
      }), M.useEffect(() => () => u2.dispose(), [u2]), M.createElement("primitive", b.default({ object: u2, ref: c2, font: r2, text: p2, anchorX: e2, anchorY: t2 }, s2), f2);
    });
    var ie = ["string", "number"];
    var se = M.forwardRef((_a, p2) => {
      var _b = _a, { font: e2, loader: r2, size: n2 = 1, height: a2 = 0.2, bevelThickness: i2 = 0.1, bevelSize: s2 = 0.01, bevelEnabled: c2 = false, bevelOffset: u2 = 0, curveSegments: d2 = 8, children: m2 } = _b, f2 = __objRest(_b, ["font", "loader", "size", "height", "bevelThickness", "bevelSize", "bevelEnabled", "bevelOffset", "curveSegments", "children"]);
      M.useMemo(() => {
        o.extend({ RenamedTextGeometry: l.TextGeometry });
      }, []);
      const h2 = M.useMemo(() => r2.parse(e2), [e2]), v2 = t.useMemo(() => ({ font: h2, size: n2, height: a2, bevelThickness: i2, bevelSize: s2, bevelEnabled: c2, bevelOffset: u2, curveSegments: d2 }), [h2, n2, a2, i2, s2, c2, u2, d2]), g2 = t.useMemo(() => ((e3) => {
        let t2 = "";
        return M.Children.map(e3, (e4) => {
          ie.includes(typeof e4) && (t2 += e4 + "");
        }), t2;
      })(m2), [m2]), x2 = M.useMemo(() => [g2, v2], [g2, v2]);
      return M.createElement("mesh", b.default({}, f2, { ref: p2 }), M.createElement("renamedTextGeometry", { args: x2 }), m2);
    });
    var ce = M.forwardRef((_a, n2) => {
      var _b = _a, { font: e2, loader: t2 } = _b, r2 = __objRest(_b, ["font", "loader"]);
      const o2 = m.suspend(async () => await (await fetch(e2)).json(), [e2]);
      return M.createElement(se, b.default({}, r2, { ref: n2, font: o2, loader: t2 }));
    });
    var le = M.forwardRef((e2, t2) => {
      const r2 = M.useMemo(() => new l.FontLoader(), []);
      return typeof e2.font == "string" ? M.createElement(ce, b.default({}, e2, { ref: t2, loader: r2 })) : M.createElement(se, b.default({}, e2, { ref: t2, loader: r2 }));
    });
    var ue = M.forwardRef((_a, h2) => {
      var _b = _a, { children: e2, multisamping: t2 = 8, renderIndex: r2 = 1, disableRender: a2, disableGamma: i2, disableRenderPass: s2, depthBuffer: c2 = true, stencilBuffer: u2 = false, anisotropy: d2 = 1, encoding: m2, type: f2 } = _b, p2 = __objRest(_b, ["children", "multisamping", "renderIndex", "disableRender", "disableGamma", "disableRenderPass", "depthBuffer", "stencilBuffer", "anisotropy", "encoding", "type"]);
      M.useMemo(() => o.extend({ EffectComposer: l.EffectComposer, RenderPass: l.RenderPass, ShaderPass: l.ShaderPass }), []);
      const v2 = M.useRef(), { scene: g2, camera: x2, gl: y2, size: E2, viewport: w2 } = o.useThree(), [S2] = M.useState(() => {
        const e3 = new n.WebGLRenderTarget(E2.width, E2.height, { type: f2 || n.HalfFloatType, format: n.RGBAFormat, encoding: m2 || y2.outputEncoding, depthBuffer: c2, stencilBuffer: u2, anisotropy: d2 });
        return e3.samples = t2, e3;
      });
      M.useEffect(() => {
        var e3, t3;
        (e3 = v2.current) == null || e3.setSize(E2.width, E2.height), (t3 = v2.current) == null || t3.setPixelRatio(w2.dpr);
      }, [y2, E2, w2.dpr]), o.useFrame(() => {
        var e3;
        a2 || (e3 = v2.current) == null || e3.render();
      }, r2);
      const T2 = [];
      return s2 || T2.push(M.createElement("renderPass", { key: "renderpass", attach: `passes-${T2.length}`, args: [g2, x2] })), i2 || T2.push(M.createElement("shaderPass", { attach: `passes-${T2.length}`, key: "gammapass", args: [l.GammaCorrectionShader] })), M.Children.forEach(e2, (e3) => {
        e3 && T2.push(M.cloneElement(e3, { key: T2.length, attach: `passes-${T2.length}` }));
      }), M.createElement("effectComposer", b.default({ ref: C.default([h2, v2]), args: [y2, S2] }, p2), T2);
    });
    function de(e2, t2, r2, n2) {
      const o2 = class extends T.ShaderMaterial {
        constructor() {
          const o3 = Object.entries(e2);
          super({ uniforms: o3.reduce((e3, [t3, r3]) => __spreadValues(__spreadValues({}, e3), T.UniformsUtils.clone({ [t3]: { value: r3 } })), {}), vertexShader: t2, fragmentShader: r2 }), this.key = "", o3.forEach(([e3]) => Object.defineProperty(this, e3, { get: () => this.uniforms[e3].value, set: (t3) => this.uniforms[e3].value = t3 })), n2 && n2(this);
        }
      };
      return o2.key = T.MathUtils.generateUUID(), o2;
    }
    var me = (e2) => e2 === Object(e2) && !Array.isArray(e2) && typeof e2 != "function";
    function fe(e2, r2) {
      const a2 = o.useThree((e3) => e3.gl), i2 = o.useLoader(n.TextureLoader, me(e2) ? Object.values(e2) : e2);
      if (t.useLayoutEffect(() => {
        r2 == null || r2(i2);
      }, [r2]), t.useEffect(() => {
        (Array.isArray(i2) ? i2 : [i2]).forEach(a2.initTexture);
      }, [a2, i2]), me(e2)) {
        const t2 = Object.keys(e2), r3 = {};
        return t2.forEach((e3) => Object.assign(r3, { [e3]: i2[t2.indexOf(e3)] })), r3;
      }
      return i2;
    }
    fe.preload = (e2) => o.useLoader.preload(n.TextureLoader, e2), fe.clear = (e2) => o.useLoader.clear(n.TextureLoader, e2);
    var pe = de({ color: new T.Color("white"), scale: [1, 1], imageBounds: [1, 1], map: null, zoom: 1, grayscale: 0, opacity: 1 }, "\n  varying vec2 vUv;\n  void main() {\n    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);\n    vUv = uv;\n  }\n", "\n  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44\n  varying vec2 vUv;\n  uniform vec2 scale;\n  uniform vec2 imageBounds;\n  uniform vec3 color;\n  uniform sampler2D map;\n  uniform float zoom;\n  uniform float grayscale;\n  uniform float opacity;\n  const vec3 luma = vec3(.299, 0.587, 0.114);\n  vec4 toGrayscale(vec4 color, float intensity) {\n    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);\n  }\n  vec2 aspect(vec2 size) {\n    return size / min(size.x, size.y);\n  }\n  void main() {\n    vec2 s = aspect(scale);\n    vec2 i = aspect(imageBounds);\n    float rs = s.x / s.y;\n    float ri = i.x / i.y;\n    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);\n    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;\n    vec2 uv = vUv * s / new + offset;\n    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);\n    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity), grayscale);\n    \n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n  }\n");
    var he = M.forwardRef((_a, m2) => {
      var _b = _a, { children: e2, color: t2, segments: r2 = 1, scale: n2 = 1, zoom: a2 = 1, grayscale: i2 = 0, opacity: s2 = 1, texture: c2, toneMapped: l2, transparent: u2 } = _b, d2 = __objRest(_b, ["children", "color", "segments", "scale", "zoom", "grayscale", "opacity", "texture", "toneMapped", "transparent"]);
      o.extend({ ImageMaterial: pe });
      const f2 = o.useThree((e3) => e3.gl), p2 = Array.isArray(n2) ? [n2[0], n2[1]] : [n2, n2], h2 = [c2.image.width, c2.image.height];
      return M.createElement("mesh", b.default({ ref: m2, scale: n2 }, d2), M.createElement("planeGeometry", { args: [1, 1, r2, r2] }), M.createElement("imageMaterial", { color: t2, map: c2, "map-encoding": f2.outputEncoding, zoom: a2, grayscale: i2, opacity: s2, scale: p2, imageBounds: h2, toneMapped: l2, transparent: u2 }), e2);
    });
    var ve = M.forwardRef((_a, r2) => {
      var _b = _a, { url: e2 } = _b, t2 = __objRest(_b, ["url"]);
      const n2 = fe(e2);
      return M.createElement(he, b.default({}, t2, { texture: n2, ref: r2 }));
    });
    var ge = M.forwardRef((_a, r2) => {
      var _b = _a, { url: e2 } = _b, t2 = __objRest(_b, ["url"]);
      return M.createElement(he, b.default({}, t2, { ref: r2 }));
    });
    var xe = M.forwardRef((e2, t2) => {
      if (e2.url)
        return M.createElement(ve, b.default({}, e2, { ref: t2 }));
      if (e2.texture)
        return M.createElement(ge, b.default({}, e2, { ref: t2 }));
      throw new Error("<Image /> requires a url or texture");
    });
    var ye = { width: 0.2, length: 1, decay: 1, local: false, stride: 0, interval: 1 };
    var Ee = (e2, t2 = 1) => (e2.set(e2.subarray(t2)), e2.fill(-1 / 0, -t2), e2);
    function we(e2, t2) {
      const { length: r2, local: a2, decay: i2, interval: s2, stride: c2 } = __spreadValues(__spreadValues({}, ye), t2), l2 = M.useRef(), [u2] = M.useState(() => new n.Vector3());
      M.useLayoutEffect(() => {
        e2 && (l2.current = Float32Array.from({ length: 10 * r2 * 3 }, (t3, r3) => e2.position.getComponent(r3 % 3)));
      }, [r2, e2]);
      const d2 = M.useRef(new n.Vector3()), m2 = M.useRef(0);
      return o.useFrame(() => {
        if (e2 && l2.current) {
          if (m2.current === 0) {
            let t3;
            a2 ? t3 = e2.position : (e2.getWorldPosition(u2), t3 = u2);
            const r3 = 1 * i2;
            for (let e3 = 0; e3 < r3; e3++)
              t3.distanceTo(d2.current) < c2 || (Ee(l2.current, 3), l2.current.set(t3.toArray(), l2.current.length - 3));
            d2.current.copy(t3);
          }
          m2.current++, m2.current = m2.current % s2;
        }
      }), l2;
    }
    var be = M.forwardRef((e2, t2) => {
      const { children: r2 } = e2, { width: a2, length: i2, decay: s2, local: c2, stride: l2, interval: u2 } = __spreadValues(__spreadValues({}, ye), e2), { color: d2 = "hotpink", attenuation: m2, target: p2 } = e2, h2 = o.useThree((e3) => e3.size), v2 = M.useRef(null), [g2, x2] = M.useState(null), y2 = we(g2, { length: i2, decay: s2, local: c2, stride: l2, interval: u2 });
      M.useEffect(() => {
        const e3 = (p2 == null ? void 0 : p2.current) || v2.current.children.find((e4) => e4 instanceof n.Object3D);
        e3 && x2(e3);
      }, [y2, p2]);
      const E2 = M.useMemo(() => new f.MeshLine(), []), w2 = M.useMemo(() => {
        var e3;
        const t3 = new f.MeshLineMaterial({ lineWidth: 0.1 * a2, color: d2, sizeAttenuation: 1, resolution: new n.Vector2(h2.width, h2.height) });
        let o2;
        if (r2)
          if (Array.isArray(r2))
            o2 = r2.find((e4) => {
              const t4 = e4;
              return typeof t4.type == "string" && t4.type === "meshLineMaterial";
            });
          else {
            const e4 = r2;
            typeof e4.type == "string" && e4.type === "meshLineMaterial" && (o2 = e4);
          }
        return typeof ((e3 = o2) == null ? void 0 : e3.props) == "object" && t3.setValues(o2.props), t3;
      }, [a2, d2, h2, r2]);
      return M.useEffect(() => {
        w2.uniforms.resolution.value.set(h2.width, h2.height);
      }, [h2]), o.useFrame(() => {
        y2.current && E2.setPoints(y2.current, m2);
      }), M.createElement("group", null, M.createElement("mesh", { ref: t2, geometry: E2, material: w2 }), M.createElement("group", { ref: v2 }, r2));
    });
    function Me(e2, { keys: t2 = ["near", "far", "color", "distance", "decay", "penumbra", "angle", "intensity", "skeleton", "visible", "castShadow", "receiveShadow", "morphTargetDictionary", "morphTargetInfluences", "name", "geometry", "material", "position", "rotation", "scale", "up", "userData"], deep: r2, inject: n2, castShadow: o2, receiveShadow: a2 }) {
      let i2 = _.default(e2, t2);
      return r2 && (i2.geometry && r2 !== "materialsOnly" && (i2.geometry = i2.geometry.clone()), i2.material && r2 !== "geometriesOnly" && (i2.material = i2.material.clone())), n2 && (i2 = typeof n2 == "function" ? __spreadProps(__spreadValues({}, i2), { children: n2(e2) }) : M.isValidElement(n2) ? __spreadProps(__spreadValues({}, i2), { children: n2 }) : __spreadValues(__spreadValues({}, i2), n2)), e2.type === "Mesh" && (o2 && (i2.castShadow = true), a2 && (i2.receiveShadow = true)), i2;
    }
    var Se = M.forwardRef((_a, c2) => {
      var _b = _a, { object: e2, children: t2, deep: r2, castShadow: n2, receiveShadow: o2, inject: a2, keys: i2 } = _b, s2 = __objRest(_b, ["object", "children", "deep", "castShadow", "receiveShadow", "inject", "keys"]);
      const l2 = { keys: i2, deep: r2, inject: a2, castShadow: n2, receiveShadow: o2 };
      if (Array.isArray(e2))
        return M.createElement("group", b.default({}, s2, { ref: c2 }), e2.map((e3) => M.createElement(Se, b.default({ key: e3.uuid, object: e3 }, l2))), t2);
      const _a2 = Me(e2, l2), { children: u2 } = _a2, d2 = __objRest(_a2, ["children"]), m2 = e2.type[0].toLowerCase() + e2.type.slice(1);
      return M.createElement(m2, b.default({}, d2, s2, { ref: c2 }), (e2 == null ? void 0 : e2.children).map((e3) => {
        let t3 = {}, r3 = e3.type[0].toLowerCase() + e3.type.slice(1);
        return r3 === "group" || r3 === "object3D" ? (r3 = Se, t3 = __spreadValues({ object: e3 }, l2)) : t3 = Me(e3, l2), M.createElement(r3, b.default({ key: e3.uuid }, t3));
      }), t2, u2);
    });
    var Te = M.forwardRef((_a, r2) => {
      var _b = _a, { makeDefault: e2 } = _b, t2 = __objRest(_b, ["makeDefault"]);
      const n2 = o.useThree(({ set: e3 }) => e3), a2 = o.useThree(({ camera: e3 }) => e3), i2 = o.useThree(({ size: e3 }) => e3), s2 = M.useRef();
      return M.useLayoutEffect(() => {
        s2.current && !t2.manual && s2.current.updateProjectionMatrix();
      }, [i2, t2]), M.useLayoutEffect(() => {
        if (e2 && s2.current) {
          const e3 = a2;
          return n2(() => ({ camera: s2.current })), () => n2(() => ({ camera: e3 }));
        }
      }, [s2, e2, n2]), M.createElement("orthographicCamera", b.default({ left: i2.width / -2, right: i2.width / 2, top: i2.height / 2, bottom: i2.height / -2, ref: C.default([s2, r2]) }, t2));
    });
    var Pe = M.forwardRef((_a, r2) => {
      var _b = _a, { makeDefault: e2 } = _b, t2 = __objRest(_b, ["makeDefault"]);
      const n2 = o.useThree(({ set: e3 }) => e3), a2 = o.useThree(({ camera: e3 }) => e3), i2 = o.useThree(({ size: e3 }) => e3), s2 = M.useRef();
      return M.useLayoutEffect(() => {
        const { current: e3 } = s2;
        e3 && !t2.manual && (e3.aspect = i2.width / i2.height, e3.updateProjectionMatrix());
      }, [i2, t2]), M.useLayoutEffect(() => {
        if (e2 && s2.current) {
          const e3 = a2;
          return n2(() => ({ camera: s2.current })), () => n2(() => ({ camera: e3 }));
        }
      }, [s2, e2, n2]), M.createElement("perspectiveCamera", b.default({ ref: C.default([s2, r2]) }, t2));
    });
    var Ce = M.forwardRef((e2, t2) => {
      const _a = e2, { camera: r2, onChange: n2 } = _a, a2 = __objRest(_a, ["camera", "onChange"]), i2 = o.useThree((e3) => e3.camera), s2 = o.useThree((e3) => e3.invalidate), c2 = r2 || i2, [u2] = M.useState(() => new l.DeviceOrientationControls(c2));
      return M.useEffect(() => {
        const e3 = (e4) => {
          s2(), n2 && n2(e4);
        };
        return u2 == null || u2.addEventListener == null || u2.addEventListener("change", e3), () => u2 == null || u2.removeEventListener == null ? void 0 : u2.removeEventListener("change", e3);
      }, [n2, u2, s2]), o.useFrame(() => u2 == null ? void 0 : u2.update(), -1), M.useEffect(() => {
        const e3 = u2;
        return e3 == null || e3.connect(), () => e3 == null ? void 0 : e3.dispose();
      }, [u2]), u2 ? M.createElement("primitive", b.default({ ref: t2, object: u2 }, a2)) : null;
    });
    var Re = M.forwardRef((_a, r2) => {
      var _b = _a, { domElement: e2 } = _b, t2 = __objRest(_b, ["domElement"]);
      const _a2 = t2, { onChange: n2 } = _a2, a2 = __objRest(_a2, ["onChange"]), i2 = o.useThree((e3) => e3.invalidate), s2 = o.useThree((e3) => e3.camera), c2 = o.useThree((e3) => e3.gl), u2 = o.useThree((e3) => e3.events), d2 = e2 || u2.connected || c2.domElement, [m2] = M.useState(() => new l.FlyControls(s2, d2));
      return M.useEffect(() => {
        const e3 = (e4) => {
          i2(), n2 && n2(e4);
        };
        return m2 == null || m2.addEventListener == null || m2.addEventListener("change", e3), () => m2 == null || m2.removeEventListener == null ? void 0 : m2.removeEventListener("change", e3);
      }, [n2, m2, i2]), o.useFrame((e3, t3) => m2 == null ? void 0 : m2.update(t3)), m2 ? M.createElement("primitive", b.default({ ref: r2, object: m2 }, a2)) : null;
    });
    var _e = M.forwardRef((e2 = { enableDamping: true }, t2) => {
      const _a = e2, { domElement: r2, camera: n2, onChange: a2, onStart: i2, onEnd: s2 } = _a, c2 = __objRest(_a, ["domElement", "camera", "onChange", "onStart", "onEnd"]), u2 = o.useThree((e3) => e3.invalidate), d2 = o.useThree((e3) => e3.camera), m2 = o.useThree((e3) => e3.gl), f2 = o.useThree((e3) => e3.events), p2 = r2 || f2.connected || m2.domElement, h2 = n2 || d2, v2 = M.useMemo(() => new l.MapControls(h2), [h2]);
      return M.useEffect(() => {
        v2.connect(p2);
        const e3 = (e4) => {
          u2(), a2 && a2(e4);
        };
        return v2.addEventListener("change", e3), i2 && v2.addEventListener("start", i2), s2 && v2.addEventListener("end", s2), () => {
          v2.dispose(), v2.removeEventListener("change", e3), i2 && v2.removeEventListener("start", i2), s2 && v2.removeEventListener("end", s2);
        };
      }, [a2, i2, s2, v2, u2, p2]), o.useFrame(() => v2.update(), -1), M.createElement("primitive", b.default({ ref: t2, object: v2, enableDamping: true }, c2));
    });
    var Le = M.forwardRef((_a, d2) => {
      var _b = _a, { makeDefault: e2, camera: t2, regress: r2, domElement: n2, enableDamping: a2 = true, onChange: i2, onStart: s2, onEnd: c2 } = _b, u2 = __objRest(_b, ["makeDefault", "camera", "regress", "domElement", "enableDamping", "onChange", "onStart", "onEnd"]);
      const m2 = o.useThree((e3) => e3.invalidate), f2 = o.useThree((e3) => e3.camera), p2 = o.useThree((e3) => e3.gl), h2 = o.useThree((e3) => e3.events), v2 = o.useThree((e3) => e3.set), g2 = o.useThree((e3) => e3.get), x2 = o.useThree((e3) => e3.performance), y2 = t2 || f2, E2 = n2 || h2.connected || p2.domElement, w2 = M.useMemo(() => new l.OrbitControls(y2), [y2]);
      return o.useFrame(() => {
        w2.enabled && w2.update();
      }, -1), M.useEffect(() => (w2.connect(E2), () => {
        w2.dispose();
      }), [E2, r2, w2, m2]), M.useEffect(() => {
        const e3 = (e4) => {
          m2(), r2 && x2.regress(), i2 && i2(e4);
        };
        return w2.addEventListener("change", e3), s2 && w2.addEventListener("start", s2), c2 && w2.addEventListener("end", c2), () => {
          s2 && w2.removeEventListener("start", s2), c2 && w2.removeEventListener("end", c2), w2.removeEventListener("change", e3);
        };
      }, [i2, s2, c2, w2, m2]), M.useEffect(() => {
        if (e2) {
          const e3 = g2().controls;
          return v2({ controls: w2 }), () => v2({ controls: e3 });
        }
      }, [e2, w2]), M.createElement("primitive", b.default({ ref: d2, object: w2, enableDamping: a2 }, u2));
    });
    var De = M.forwardRef((_a, u2) => {
      var _b = _a, { makeDefault: e2, camera: t2, domElement: r2, regress: n2, onChange: a2, onStart: i2, onEnd: s2 } = _b, c2 = __objRest(_b, ["makeDefault", "camera", "domElement", "regress", "onChange", "onStart", "onEnd"]);
      const { invalidate: d2, camera: m2, gl: f2, events: p2, set: h2, get: v2, performance: g2, viewport: x2 } = o.useThree(), y2 = t2 || m2, E2 = r2 || p2.connected || f2.domElement, w2 = M.useMemo(() => new l.TrackballControls(y2), [y2]);
      return o.useFrame(() => {
        w2.enabled && w2.update();
      }, -1), M.useEffect(() => (w2.connect(E2), () => {
        w2.dispose();
      }), [E2, n2, w2, d2]), M.useEffect(() => {
        const e3 = (e4) => {
          d2(), n2 && g2.regress(), a2 && a2(e4);
        };
        return w2.addEventListener("change", e3), i2 && w2.addEventListener("start", i2), s2 && w2.addEventListener("end", s2), () => {
          i2 && w2.removeEventListener("start", i2), s2 && w2.removeEventListener("end", s2), w2.removeEventListener("change", e3);
        };
      }, [a2, i2, s2, w2, d2]), M.useEffect(() => {
        w2.handleResize();
      }, [x2]), M.useEffect(() => {
        if (e2) {
          const e3 = v2().controls;
          return h2({ controls: w2 }), () => h2({ controls: e3 });
        }
      }, [e2, w2]), M.createElement("primitive", b.default({ ref: u2, object: w2 }, c2));
    });
    var ze = t.forwardRef((_a, d2) => {
      var _b = _a, { camera: e2, makeDefault: r2, regress: n2, domElement: a2, onChange: i2, onStart: s2, onEnd: c2 } = _b, u2 = __objRest(_b, ["camera", "makeDefault", "regress", "domElement", "onChange", "onStart", "onEnd"]);
      const m2 = o.useThree((e3) => e3.invalidate), f2 = o.useThree((e3) => e3.camera), p2 = o.useThree((e3) => e3.gl), h2 = o.useThree((e3) => e3.events), v2 = o.useThree((e3) => e3.set), g2 = o.useThree((e3) => e3.get), x2 = o.useThree((e3) => e3.performance), y2 = e2 || f2, E2 = a2 || h2.connected || p2.domElement, w2 = t.useMemo(() => new l.ArcballControls(y2), [y2]);
      return o.useFrame(() => {
        w2.enabled && w2.update();
      }, -1), t.useEffect(() => (w2.connect(E2), () => {
        w2.dispose();
      }), [E2, n2, w2, m2]), t.useEffect(() => {
        const e3 = (e4) => {
          m2(), n2 && x2.regress(), i2 && i2(e4);
        };
        return w2.addEventListener("change", e3), s2 && w2.addEventListener("start", s2), c2 && w2.addEventListener("end", c2), () => {
          w2.removeEventListener("change", e3), s2 && w2.removeEventListener("start", s2), c2 && w2.removeEventListener("end", c2);
        };
      }, [i2, s2, c2]), t.useEffect(() => {
        if (r2) {
          const e3 = g2().controls;
          return v2({ controls: w2 }), () => v2({ controls: e3 });
        }
      }, [r2, w2]), M.createElement("primitive", b.default({ ref: d2, object: w2 }, u2));
    });
    var Ae = M.forwardRef((_a, u2) => {
      var _b = _a, { children: e2, domElement: t2, onChange: r2, onMouseDown: n2, onMouseUp: a2, onObjectChange: i2, object: s2 } = _b, c2 = __objRest(_b, ["children", "domElement", "onChange", "onMouseDown", "onMouseUp", "onObjectChange", "object"]);
      const d2 = ["enabled", "axis", "mode", "translationSnap", "rotationSnap", "scaleSnap", "space", "size", "showX", "showY", "showZ"], _a2 = c2, { camera: m2 } = _a2, f2 = __objRest(_a2, ["camera"]), p2 = _.default(f2, d2), h2 = L.default(f2, d2), v2 = o.useThree((e3) => e3.controls), g2 = o.useThree((e3) => e3.gl), x2 = o.useThree((e3) => e3.events), y2 = o.useThree((e3) => e3.camera), E2 = o.useThree((e3) => e3.invalidate), w2 = m2 || y2, S2 = t2 || x2.connected || g2.domElement, P2 = M.useMemo(() => new l.TransformControls(w2, S2), [w2, S2]), C2 = M.useRef();
      return M.useLayoutEffect(() => (s2 ? P2.attach(s2 instanceof T.Object3D ? s2 : s2.current) : C2.current instanceof T.Object3D && P2.attach(C2.current), () => {
        P2.detach();
      }), [s2, e2, P2]), M.useEffect(() => {
        if (v2) {
          const e3 = (e4) => v2.enabled = !e4.value;
          return P2.addEventListener("dragging-changed", e3), () => P2.removeEventListener("dragging-changed", e3);
        }
      }, [P2, v2]), M.useEffect(() => {
        const e3 = (e4) => {
          E2(), r2 && r2(e4);
        };
        return P2 == null || P2.addEventListener == null || P2.addEventListener("change", e3), n2 && (P2 == null || P2.addEventListener == null || P2.addEventListener("mouseDown", n2)), a2 && (P2 == null || P2.addEventListener == null || P2.addEventListener("mouseUp", a2)), i2 && (P2 == null || P2.addEventListener == null || P2.addEventListener("objectChange", i2)), () => {
          P2 == null || P2.removeEventListener == null || P2.removeEventListener("change", e3), n2 && (P2 == null || P2.removeEventListener == null || P2.removeEventListener("mouseDown", n2)), a2 && (P2 == null || P2.removeEventListener == null || P2.removeEventListener("mouseUp", a2)), i2 && (P2 == null || P2.removeEventListener == null || P2.removeEventListener("objectChange", i2));
        };
      }, [r2, n2, a2, i2, P2, E2]), P2 ? M.createElement(M.Fragment, null, M.createElement("primitive", b.default({ ref: u2, object: P2 }, p2)), M.createElement("group", b.default({ ref: C2 }, h2), e2)) : null;
    });
    var Fe = M.forwardRef((_a, c2) => {
      var _b = _a, { domElement: e2, selector: t2, onChange: r2, onLock: n2, onUnlock: a2, enabled: i2 = true } = _b, s2 = __objRest(_b, ["domElement", "selector", "onChange", "onLock", "onUnlock", "enabled"]);
      const _a2 = s2, { camera: u2 } = _a2, d2 = __objRest(_a2, ["camera"]), m2 = o.useThree((e3) => e3.get), f2 = o.useThree((e3) => e3.setEvents), p2 = o.useThree((e3) => e3.gl), h2 = o.useThree((e3) => e3.camera), v2 = o.useThree((e3) => e3.invalidate), g2 = o.useThree((e3) => e3.events), x2 = u2 || h2, y2 = e2 || g2.connected || p2.domElement, [E2] = M.useState(() => new l.PointerLockControls(x2));
      return M.useEffect(() => {
        if (i2) {
          E2.connect(y2);
          const e3 = m2().events.compute;
          return f2({ compute(e4, t3) {
            const r3 = t3.size.width / 2, n3 = t3.size.height / 2;
            t3.pointer.set(r3 / t3.size.width * 2 - 1, -n3 / t3.size.height * 2 + 1), t3.raycaster.setFromCamera(t3.pointer, t3.camera);
          } }), () => {
            E2.disconnect(), f2({ compute: e3 });
          };
        }
      }, [i2, E2]), M.useEffect(() => {
        const e3 = (e4) => {
          v2(), r2 && r2(e4);
        };
        E2.addEventListener("change", e3), n2 && E2.addEventListener("lock", n2), a2 && E2.addEventListener("unlock", a2);
        const o2 = () => E2.lock(), i3 = t2 ? Array.from(document.querySelectorAll(t2)) : [document];
        return i3.forEach((e4) => e4 && e4.addEventListener("click", o2)), () => {
          E2.removeEventListener("change", e3), n2 && E2.addEventListener("lock", n2), a2 && E2.addEventListener("unlock", a2), i3.forEach((e4) => e4 ? e4.removeEventListener("click", o2) : void 0);
        };
      }, [r2, n2, a2, t2, E2, v2]), M.createElement("primitive", b.default({ ref: c2, object: E2 }, d2));
    });
    var Be = M.forwardRef((_a, r2) => {
      var _b = _a, { domElement: e2 } = _b, t2 = __objRest(_b, ["domElement"]);
      const n2 = o.useThree((e3) => e3.camera), a2 = o.useThree((e3) => e3.gl), i2 = o.useThree((e3) => e3.events), s2 = e2 || i2.connected || a2.domElement, [c2] = M.useState(() => new l.FirstPersonControls(n2, s2));
      return o.useFrame((e3, t3) => {
        c2.update(t3);
      }, -1), c2 ? M.createElement("primitive", b.default({ ref: r2, object: c2 }, t2)) : null;
    });
    function ke(e2, t2) {
      const r2 = o.useThree((e3) => e3.pointer), [a2] = M.useState(() => {
        const a3 = new n.Raycaster();
        return t2 && o.applyProps(a3, t2, {}), function(t3, o2) {
          a3.setFromCamera(r2, e2 instanceof n.Camera ? e2 : e2.current);
          const i2 = this.constructor.prototype.raycast.bind(this);
          i2 && i2(a3, o2);
        };
      });
      return a2;
    }
    var Ue = M.createContext({});
    var je = () => M.useContext(Ue);
    var Ve = 2 * Math.PI;
    var Oe = new n.Object3D();
    var Ie = new n.Matrix4();
    var [We, Ne] = [new n.Quaternion(), new n.Quaternion()];
    var Ge = new n.Vector3();
    var He = new n.Vector3();
    var $e = "#f0f0f0";
    var qe = "#999";
    var Xe = "black";
    var Ye = "black";
    var Ze = ["Right", "Left", "Top", "Bottom", "Front", "Back"];
    var Ke = (e2) => new n.Vector3(...e2).multiplyScalar(0.38);
    var Je = [[1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]].map(Ke);
    var Qe = [0.25, 0.25, 0.25];
    var et = [[1, 1, 0], [1, 0, 1], [1, 0, -1], [1, -1, 0], [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1], [-1, 1, 0], [-1, 0, 1], [-1, 0, -1], [-1, -1, 0]].map(Ke);
    var tt = et.map((e2) => e2.toArray().map((e3) => e3 == 0 ? 0.5 : 0.25));
    var rt = ({ hover: e2, index: t2, font: r2 = "20px Inter var, Arial, sans-serif", faces: a2 = Ze, color: i2 = $e, hoverColor: s2 = qe, textColor: c2 = Xe, strokeColor: l2 = Ye, opacity: u2 = 1 }) => {
      const d2 = o.useThree((e3) => e3.gl), m2 = M.useMemo(() => {
        const e3 = document.createElement("canvas");
        e3.width = 128, e3.height = 128;
        const o2 = e3.getContext("2d");
        return o2.fillStyle = i2, o2.fillRect(0, 0, e3.width, e3.height), o2.strokeStyle = l2, o2.strokeRect(0, 0, e3.width, e3.height), o2.font = r2, o2.textAlign = "center", o2.fillStyle = c2, o2.fillText(a2[t2].toUpperCase(), 64, 76), new n.CanvasTexture(e3);
      }, [t2, a2, r2, i2, c2, l2]);
      return M.createElement("meshLambertMaterial", { map: m2, "map-encoding": d2.outputEncoding, "map-anisotropy": d2.capabilities.getMaxAnisotropy() || 1, attach: `material-${t2}`, color: e2 ? s2 : "white", transparent: true, opacity: u2 });
    };
    var nt = (e2) => {
      const { tweenCamera: t2, raycast: r2 } = je(), [n2, o2] = M.useState(null);
      return M.createElement("mesh", { raycast: r2, onPointerOut: (e3) => {
        e3.stopPropagation(), o2(null);
      }, onPointerMove: (e3) => {
        e3.stopPropagation(), o2(Math.floor(e3.faceIndex / 2));
      }, onClick: e2.onClick || ((e3) => {
        e3.stopPropagation(), t2(e3.face.normal);
      }) }, [...Array(6)].map((t3, r3) => M.createElement(rt, b.default({ key: r3, index: r3, hover: n2 === r3 }, e2))), M.createElement("boxGeometry", null));
    };
    var ot = ({ onClick: e2, dimensions: t2, position: r2, hoverColor: n2 = qe }) => {
      const { tweenCamera: o2, raycast: a2 } = je(), [i2, s2] = M.useState(false);
      return M.createElement("mesh", { scale: 1.01, position: r2, raycast: a2, onPointerOver: (e3) => {
        e3.stopPropagation(), s2(true);
      }, onPointerOut: (e3) => {
        e3.stopPropagation(), s2(false);
      }, onClick: e2 || ((e3) => {
        e3.stopPropagation(), o2(r2);
      }) }, M.createElement("meshBasicMaterial", { color: i2 ? n2 : "white", transparent: true, opacity: 0.6, visible: i2 }), M.createElement("boxGeometry", { args: t2 }));
    };
    function at({ scale: e2 = [0.8, 0.05, 0.05], color: t2, rotation: r2 }) {
      return M.createElement("group", { rotation: r2 }, M.createElement("mesh", { position: [0.4, 0, 0] }, M.createElement("boxGeometry", { args: e2 }), M.createElement("meshBasicMaterial", { color: t2, toneMapped: false })));
    }
    function it(_a) {
      var _b = _a, { onClick: e2, font: t2, disabled: r2, arcStyle: a2, label: i2, labelColor: s2, axisHeadScale: c2 = 1 } = _b, l2 = __objRest(_b, ["onClick", "font", "disabled", "arcStyle", "label", "labelColor", "axisHeadScale"]);
      const u2 = o.useThree((e3) => e3.gl), d2 = M.useMemo(() => {
        const e3 = document.createElement("canvas");
        e3.width = 64, e3.height = 64;
        const r3 = e3.getContext("2d");
        return r3.beginPath(), r3.arc(32, 32, 16, 0, 2 * Math.PI), r3.closePath(), r3.fillStyle = a2, r3.fill(), i2 && (r3.font = t2, r3.textAlign = "center", r3.fillStyle = s2, r3.fillText(i2, 32, 41)), new n.CanvasTexture(e3);
      }, [a2, i2, s2, t2]), [m2, f2] = M.useState(false), p2 = (i2 ? 1 : 0.75) * (m2 ? 1.2 : 1) * c2;
      return M.createElement("sprite", b.default({ scale: p2, onPointerOver: r2 ? void 0 : (e3) => {
        e3.stopPropagation(), f2(true);
      }, onPointerOut: r2 ? void 0 : e2 || ((e3) => {
        e3.stopPropagation(), f2(false);
      }) }, l2), M.createElement("spriteMaterial", { map: d2, "map-encoding": u2.outputEncoding, "map-anisotropy": u2.capabilities.getMaxAnisotropy() || 1, alphaTest: 0.3, opacity: i2 ? 1 : 0.75, toneMapped: false }));
    }
    function st(e2, { path: t2 }) {
      const [r2] = o.useLoader(n.CubeTextureLoader, [e2], (e3) => e3.setPath(t2));
      return r2;
    }
    function ct(e2) {
      return o.useLoader(l.FBXLoader, e2);
    }
    st.preload = (e2, { path: t2 }) => o.useLoader.preload(n.CubeTextureLoader, [e2], (e3) => e3.setPath(t2)), ct.preload = (e2) => o.useLoader.preload(l.FBXLoader, e2), ct.clear = (e2) => o.useLoader.clear(l.FBXLoader, e2);
    var lt = null;
    function ut(e2, t2, r2) {
      return (n2) => {
        r2 && r2(n2), e2 && (lt || (lt = new l.DRACOLoader()), lt.setDecoderPath(typeof e2 == "string" ? e2 : "https://www.gstatic.com/draco/versioned/decoders/1.4.3/"), n2.setDRACOLoader(lt)), t2 && n2.setMeshoptDecoder(typeof l.MeshoptDecoder == "function" ? l.MeshoptDecoder() : l.MeshoptDecoder);
      };
    }
    function dt(e2, t2 = true, r2 = true, n2) {
      return o.useLoader(l.GLTFLoader, e2, ut(t2, r2, n2));
    }
    dt.preload = (e2, t2 = true, r2 = true, n2) => o.useLoader.preload(l.GLTFLoader, e2, ut(t2, r2, n2)), dt.clear = (e2) => o.useLoader.clear(l.GLTFLoader, e2);
    var mt = "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master";
    function ft(e2, r2 = `${mt}/basis/`) {
      const n2 = o.useThree((e3) => e3.gl), a2 = o.useLoader(l.KTX2Loader, me(e2) ? Object.values(e2) : e2, (e3) => {
        e3.detectSupport(n2), e3.setTranscoderPath(r2);
      });
      if (t.useEffect(() => {
        (Array.isArray(a2) ? a2 : [a2]).forEach(n2.initTexture);
      }, [n2, a2]), me(e2)) {
        const t2 = Object.keys(e2), r3 = {};
        return t2.forEach((e3) => Object.assign(r3, { [e3]: a2[t2.indexOf(e3)] })), r3;
      }
      return a2;
    }
    function pt(e2, t2) {
      typeof e2 == "function" ? e2(t2) : e2 != null && (e2.current = t2);
    }
    function ht(e2, t2, r2) {
      const { gl: n2, size: a2, viewport: i2 } = o.useThree(), s2 = typeof e2 == "number" ? e2 : a2.width * i2.dpr, c2 = typeof t2 == "number" ? t2 : a2.height * i2.dpr, l2 = (typeof e2 == "number" ? r2 : e2) || {}, _a = l2, { samples: u2 } = _a, d2 = __objRest(_a, ["samples"]), m2 = M.useMemo(() => {
        let e3;
        return e3 = new T.WebGLRenderTarget(s2, c2, __spreadValues({ minFilter: T.LinearFilter, magFilter: T.LinearFilter, encoding: n2.outputEncoding, type: T.HalfFloatType }, d2)), e3.samples = u2, e3;
      }, []);
      return M.useLayoutEffect(() => {
        m2.setSize(s2, c2), u2 && (m2.samples = u2);
      }, [u2, m2, s2, c2]), M.useEffect(() => () => m2.dispose(), []), m2;
    }
    ft.preload = (e2, t2 = `${mt}/basis/`) => o.useLoader.preload(l.KTX2Loader, e2, (e3) => {
      e3.setTranscoderPath(t2);
    }), ft.clear = (e2) => o.useLoader.clear(l.KTX2Loader, e2);
    var vt = new T.Box3();
    var gt = new T.Vector3();
    var xt = M.forwardRef(({ children: e2, curve: t2 }, r2) => {
      const [n2] = M.useState(() => new T.Scene()), [a2, i2] = M.useState(), s2 = M.useRef();
      return M.useEffect(() => {
        s2.current = new l.Flow(n2.children[0]), i2(s2.current.object3D);
      }, [e2]), M.useEffect(() => {
        var e3;
        t2 && ((e3 = s2.current) == null || e3.updateCurve(0, t2));
      }, [t2]), M.useImperativeHandle(r2, () => ({ moveAlongCurve: (e3) => {
        var t3;
        (t3 = s2.current) == null || t3.moveAlongCurve(e3);
      } })), M.createElement(M.Fragment, null, o.createPortal(e2, n2), a2 && M.createElement("primitive", { object: a2 }));
    });
    var yt = class extends n.MeshPhysicalMaterial {
      constructor(e2 = {}) {
        super(e2), this.setValues(e2), this._time = { value: 0 }, this._distort = { value: 0.4 }, this._radius = { value: 1 };
      }
      onBeforeCompile(e2) {
        e2.uniforms.time = this._time, e2.uniforms.radius = this._radius, e2.uniforms.distort = this._distort, e2.vertexShader = `
      uniform float time;
      uniform float radius;
      uniform float distort;
      #define GLSLIFY 1
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
      ${e2.vertexShader}
    `, e2.vertexShader = e2.vertexShader.replace("#include <begin_vertex>", "\n        float updateTime = time / 50.0;\n        float noise = snoise(vec3(position / 2.0 + updateTime * 5.0));\n        vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));\n        ");
      }
      get time() {
        return this._time.value;
      }
      set time(e2) {
        this._time.value = e2;
      }
      get distort() {
        return this._distort.value;
      }
      set distort(e2) {
        this._distort.value = e2;
      }
      get radius() {
        return this._radius.value;
      }
      set radius(e2) {
        this._radius.value = e2;
      }
    };
    var Et = M.forwardRef((_a, r2) => {
      var _b = _a, { speed: e2 = 1 } = _b, t2 = __objRest(_b, ["speed"]);
      const [n2] = M.useState(() => new yt());
      return o.useFrame((t3) => n2 && (n2.time = t3.clock.getElapsedTime() * e2)), M.createElement("primitive", b.default({ object: n2, ref: r2, attach: "material" }, t2));
    });
    var wt = class extends n.MeshStandardMaterial {
      constructor(e2 = {}) {
        super(e2), this.setValues(e2), this._time = { value: 0 }, this._factor = { value: 1 };
      }
      onBeforeCompile(e2) {
        e2.uniforms.time = this._time, e2.uniforms.factor = this._factor, e2.vertexShader = `
      uniform float time;
      uniform float factor;
      ${e2.vertexShader}
    `, e2.vertexShader = e2.vertexShader.replace("#include <begin_vertex>", "float theta = sin( time + position.y ) / 2.0 * factor;\n        float c = cos( theta );\n        float s = sin( theta );\n        mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );\n        vec3 transformed = vec3( position ) * m;\n        vNormal = vNormal * m;");
      }
      get time() {
        return this._time.value;
      }
      set time(e2) {
        this._time.value = e2;
      }
      get factor() {
        return this._factor.value;
      }
      set factor(e2) {
        this._factor.value = e2;
      }
    };
    var bt = M.forwardRef((_a, r2) => {
      var _b = _a, { speed: e2 = 1 } = _b, t2 = __objRest(_b, ["speed"]);
      const [n2] = M.useState(() => new wt());
      return o.useFrame((t3) => n2 && (n2.time = t3.clock.getElapsedTime() * e2)), M.createElement("primitive", b.default({ object: n2, ref: r2, attach: "material" }, t2));
    });
    var Mt = class extends n.ShaderMaterial {
      constructor(e2 = new n.Vector2()) {
        super({ uniforms: { inputBuffer: new n.Uniform(null), depthBuffer: new n.Uniform(null), resolution: new n.Uniform(new n.Vector2()), texelSize: new n.Uniform(new n.Vector2()), halfTexelSize: new n.Uniform(new n.Vector2()), kernel: new n.Uniform(0), scale: new n.Uniform(1), cameraNear: new n.Uniform(0), cameraFar: new n.Uniform(1), minDepthThreshold: new n.Uniform(0), maxDepthThreshold: new n.Uniform(1), depthScale: new n.Uniform(0), depthToBlurRatioBias: new n.Uniform(0.25) }, fragmentShader: "#include <common>\n        #include <dithering_pars_fragment>      \n        uniform sampler2D inputBuffer;\n        uniform sampler2D depthBuffer;\n        uniform float cameraNear;\n        uniform float cameraFar;\n        uniform float minDepthThreshold;\n        uniform float maxDepthThreshold;\n        uniform float depthScale;\n        uniform float depthToBlurRatioBias;\n        varying vec2 vUv;\n        varying vec2 vUv0;\n        varying vec2 vUv1;\n        varying vec2 vUv2;\n        varying vec2 vUv3;\n\n        void main() {\n          float depthFactor = 0.0;\n          \n          #ifdef USE_DEPTH\n            vec4 depth = texture2D(depthBuffer, vUv);\n            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));\n            depthFactor *= depthScale;\n            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));\n          #endif\n          \n          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));\n          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));\n          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));\n          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));\n          gl_FragColor = sum * 0.25 ;\n\n          #include <dithering_fragment>\n          #include <tonemapping_fragment>\n          #include <encodings_fragment>\n        }", vertexShader: "uniform vec2 texelSize;\n        uniform vec2 halfTexelSize;\n        uniform float kernel;\n        uniform float scale;\n        varying vec2 vUv;\n        varying vec2 vUv0;\n        varying vec2 vUv1;\n        varying vec2 vUv2;\n        varying vec2 vUv3;\n\n        void main() {\n          vec2 uv = position.xy * 0.5 + 0.5;\n          vUv = uv;\n\n          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;\n          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);\n          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);\n          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);\n          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);\n\n          gl_Position = vec4(position.xy, 1.0, 1.0);\n        }", blending: n.NoBlending, depthWrite: false, depthTest: false }), this.toneMapped = false, this.setTexelSize(e2.x, e2.y), this.kernel = new Float32Array([0, 1, 2, 2, 3]);
      }
      setTexelSize(e2, t2) {
        this.uniforms.texelSize.value.set(e2, t2), this.uniforms.halfTexelSize.value.set(e2, t2).multiplyScalar(0.5);
      }
      setResolution(e2) {
        this.uniforms.resolution.value.copy(e2);
      }
    };
    var St = class {
      constructor({ gl: e2, resolution: t2, width: r2 = 500, height: o2 = 500, minDepthThreshold: a2 = 0, maxDepthThreshold: i2 = 1, depthScale: s2 = 0, depthToBlurRatioBias: c2 = 0.25 }) {
        this.renderToScreen = false, this.renderTargetA = new n.WebGLRenderTarget(t2, t2, { minFilter: n.LinearFilter, magFilter: n.LinearFilter, stencilBuffer: false, depthBuffer: false, encoding: e2.outputEncoding }), this.renderTargetB = this.renderTargetA.clone(), this.convolutionMaterial = new Mt(), this.convolutionMaterial.setTexelSize(1 / r2, 1 / o2), this.convolutionMaterial.setResolution(new n.Vector2(r2, o2)), this.scene = new n.Scene(), this.camera = new n.Camera(), this.convolutionMaterial.uniforms.minDepthThreshold.value = a2, this.convolutionMaterial.uniforms.maxDepthThreshold.value = i2, this.convolutionMaterial.uniforms.depthScale.value = s2, this.convolutionMaterial.uniforms.depthToBlurRatioBias.value = c2, this.convolutionMaterial.defines.USE_DEPTH = s2 > 0;
        const l2 = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), u2 = new Float32Array([0, 0, 2, 0, 0, 2]), d2 = new n.BufferGeometry();
        d2.setAttribute("position", new n.BufferAttribute(l2, 3)), d2.setAttribute("uv", new n.BufferAttribute(u2, 2)), this.screen = new n.Mesh(d2, this.convolutionMaterial), this.screen.frustumCulled = false, this.scene.add(this.screen);
      }
      render(e2, t2, r2) {
        const n2 = this.scene, o2 = this.camera, a2 = this.renderTargetA, i2 = this.renderTargetB;
        let s2 = this.convolutionMaterial, c2 = s2.uniforms;
        c2.depthBuffer.value = t2.depthTexture;
        const l2 = s2.kernel;
        let u2, d2, m2, f2 = t2;
        for (d2 = 0, m2 = l2.length - 1; d2 < m2; ++d2)
          u2 = (1 & d2) == 0 ? a2 : i2, c2.kernel.value = l2[d2], c2.inputBuffer.value = f2.texture, e2.setRenderTarget(u2), e2.render(n2, o2), f2 = u2;
        c2.kernel.value = l2[d2], c2.inputBuffer.value = f2.texture, e2.setRenderTarget(this.renderToScreen ? null : r2), e2.render(n2, o2);
      }
    };
    var Tt = class extends n.MeshStandardMaterial {
      constructor(e2 = {}) {
        super(e2), this._tDepth = { value: null }, this._distortionMap = { value: null }, this._tDiffuse = { value: null }, this._tDiffuseBlur = { value: null }, this._textureMatrix = { value: null }, this._hasBlur = { value: false }, this._mirror = { value: 0 }, this._mixBlur = { value: 0 }, this._blurStrength = { value: 0.5 }, this._minDepthThreshold = { value: 0.9 }, this._maxDepthThreshold = { value: 1 }, this._depthScale = { value: 0 }, this._depthToBlurRatioBias = { value: 0.25 }, this._distortion = { value: 1 }, this._mixContrast = { value: 1 }, this.setValues(e2);
      }
      onBeforeCompile(e2) {
        var t2;
        (t2 = e2.defines) != null && t2.USE_UV || (e2.defines.USE_UV = ""), e2.uniforms.hasBlur = this._hasBlur, e2.uniforms.tDiffuse = this._tDiffuse, e2.uniforms.tDepth = this._tDepth, e2.uniforms.distortionMap = this._distortionMap, e2.uniforms.tDiffuseBlur = this._tDiffuseBlur, e2.uniforms.textureMatrix = this._textureMatrix, e2.uniforms.mirror = this._mirror, e2.uniforms.mixBlur = this._mixBlur, e2.uniforms.mixStrength = this._blurStrength, e2.uniforms.minDepthThreshold = this._minDepthThreshold, e2.uniforms.maxDepthThreshold = this._maxDepthThreshold, e2.uniforms.depthScale = this._depthScale, e2.uniforms.depthToBlurRatioBias = this._depthToBlurRatioBias, e2.uniforms.distortion = this._distortion, e2.uniforms.mixContrast = this._mixContrast, e2.vertexShader = `
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e2.vertexShader}`, e2.vertexShader = e2.vertexShader.replace("#include <project_vertex>", "#include <project_vertex>\n        my_vUv = textureMatrix * vec4( position, 1.0 );\n        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );"), e2.fragmentShader = `
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e2.fragmentShader}`, e2.fragmentShader = e2.fragmentShader.replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\n\n      float distortionFactor = 0.0;\n      #ifdef USE_DISTORTION\n        distortionFactor = texture2D(distortionMap, vUv).r * distortion;\n      #endif\n\n      vec4 new_vUv = my_vUv;\n      new_vUv.x += distortionFactor;\n      new_vUv.y += distortionFactor;\n\n      vec4 base = texture2DProj(tDiffuse, new_vUv);\n      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);\n\n      vec4 merge = base;\n\n      #ifdef USE_NORMALMAP\n        vec2 normal_uv = vec2(0.0);\n        vec4 normalColor = texture2D(normalMap, vUv * normalScale);\n        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );\n        vec3 coord = new_vUv.xyz / new_vUv.w;\n        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;\n        vec4 base_normal = texture2D(tDiffuse, normal_uv);\n        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);\n        merge = base_normal;\n        blur = blur_normal;\n      #endif\n\n      float depthFactor = 0.0001;\n      float blurFactor = 0.0;\n\n      #ifdef USE_DEPTH\n        vec4 depth = texture2DProj(tDepth, new_vUv);\n        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));\n        depthFactor *= depthScale;\n        depthFactor = max(0.0001, min(1.0, depthFactor));\n\n        #ifdef USE_BLUR\n          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);\n          merge = merge * min(1.0, depthFactor + 0.5);\n        #else\n          merge = merge * depthFactor;\n        #endif\n\n      #endif\n\n      float reflectorRoughnessFactor = roughness;\n      #ifdef USE_ROUGHNESSMAP\n        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );\n        reflectorRoughnessFactor *= reflectorTexelRoughness.g;\n      #endif\n\n      #ifdef USE_BLUR\n        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);\n        merge = mix(merge, blur, blurFactor);\n      #endif\n\n      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);\n      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;\n      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;\n      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;\n\n      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);\n      ");
      }
      get tDiffuse() {
        return this._tDiffuse.value;
      }
      set tDiffuse(e2) {
        this._tDiffuse.value = e2;
      }
      get tDepth() {
        return this._tDepth.value;
      }
      set tDepth(e2) {
        this._tDepth.value = e2;
      }
      get distortionMap() {
        return this._distortionMap.value;
      }
      set distortionMap(e2) {
        this._distortionMap.value = e2;
      }
      get tDiffuseBlur() {
        return this._tDiffuseBlur.value;
      }
      set tDiffuseBlur(e2) {
        this._tDiffuseBlur.value = e2;
      }
      get textureMatrix() {
        return this._textureMatrix.value;
      }
      set textureMatrix(e2) {
        this._textureMatrix.value = e2;
      }
      get hasBlur() {
        return this._hasBlur.value;
      }
      set hasBlur(e2) {
        this._hasBlur.value = e2;
      }
      get mirror() {
        return this._mirror.value;
      }
      set mirror(e2) {
        this._mirror.value = e2;
      }
      get mixBlur() {
        return this._mixBlur.value;
      }
      set mixBlur(e2) {
        this._mixBlur.value = e2;
      }
      get mixStrength() {
        return this._blurStrength.value;
      }
      set mixStrength(e2) {
        this._blurStrength.value = e2;
      }
      get minDepthThreshold() {
        return this._minDepthThreshold.value;
      }
      set minDepthThreshold(e2) {
        this._minDepthThreshold.value = e2;
      }
      get maxDepthThreshold() {
        return this._maxDepthThreshold.value;
      }
      set maxDepthThreshold(e2) {
        this._maxDepthThreshold.value = e2;
      }
      get depthScale() {
        return this._depthScale.value;
      }
      set depthScale(e2) {
        this._depthScale.value = e2;
      }
      get depthToBlurRatioBias() {
        return this._depthToBlurRatioBias.value;
      }
      set depthToBlurRatioBias(e2) {
        this._depthToBlurRatioBias.value = e2;
      }
      get distortion() {
        return this._distortion.value;
      }
      set distortion(e2) {
        this._distortion.value = e2;
      }
      get mixContrast() {
        return this._mixContrast.value;
      }
      set mixContrast(e2) {
        this._mixContrast.value = e2;
      }
    };
    o.extend({ MeshReflectorMaterialImpl: Tt });
    var Pt = M.forwardRef((_a, v2) => {
      var _b = _a, { mixBlur: e2 = 0, mixStrength: t2 = 1, resolution: r2 = 256, blur: a2 = [0, 0], minDepthThreshold: i2 = 0.9, maxDepthThreshold: s2 = 1, depthScale: c2 = 0, depthToBlurRatioBias: l2 = 0.25, mirror: u2 = 0, distortion: d2 = 1, mixContrast: m2 = 1, distortionMap: f2, reflectorOffset: p2 = 0 } = _b, h2 = __objRest(_b, ["mixBlur", "mixStrength", "resolution", "blur", "minDepthThreshold", "maxDepthThreshold", "depthScale", "depthToBlurRatioBias", "mirror", "distortion", "mixContrast", "distortionMap", "reflectorOffset"]);
      const g2 = o.useThree(({ gl: e3 }) => e3), x2 = o.useThree(({ camera: e3 }) => e3), y2 = o.useThree(({ scene: e3 }) => e3), E2 = (a2 = Array.isArray(a2) ? a2 : [a2, a2])[0] + a2[1] > 0, w2 = M.useRef(null), [S2] = M.useState(() => new n.Plane()), [T2] = M.useState(() => new n.Vector3()), [P2] = M.useState(() => new n.Vector3()), [R2] = M.useState(() => new n.Vector3()), [_2] = M.useState(() => new n.Matrix4()), [L2] = M.useState(() => new n.Vector3(0, 0, -1)), [D2] = M.useState(() => new n.Vector4()), [z2] = M.useState(() => new n.Vector3()), [A2] = M.useState(() => new n.Vector3()), [F2] = M.useState(() => new n.Vector4()), [B2] = M.useState(() => new n.Matrix4()), [k2] = M.useState(() => new n.PerspectiveCamera()), U2 = M.useCallback(() => {
        var e3;
        const t3 = w2.current.parent || ((e3 = w2.current) == null ? void 0 : e3.__r3f.parent);
        if (!t3)
          return;
        if (P2.setFromMatrixPosition(t3.matrixWorld), R2.setFromMatrixPosition(x2.matrixWorld), _2.extractRotation(t3.matrixWorld), T2.set(0, 0, 1), T2.applyMatrix4(_2), P2.addScaledVector(T2, p2), z2.subVectors(P2, R2), z2.dot(T2) > 0)
          return;
        z2.reflect(T2).negate(), z2.add(P2), _2.extractRotation(x2.matrixWorld), L2.set(0, 0, -1), L2.applyMatrix4(_2), L2.add(R2), A2.subVectors(P2, L2), A2.reflect(T2).negate(), A2.add(P2), k2.position.copy(z2), k2.up.set(0, 1, 0), k2.up.applyMatrix4(_2), k2.up.reflect(T2), k2.lookAt(A2), k2.far = x2.far, k2.updateMatrixWorld(), k2.projectionMatrix.copy(x2.projectionMatrix), B2.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), B2.multiply(k2.projectionMatrix), B2.multiply(k2.matrixWorldInverse), B2.multiply(t3.matrixWorld), S2.setFromNormalAndCoplanarPoint(T2, P2), S2.applyMatrix4(k2.matrixWorldInverse), D2.set(S2.normal.x, S2.normal.y, S2.normal.z, S2.constant);
        const r3 = k2.projectionMatrix;
        F2.x = (Math.sign(D2.x) + r3.elements[8]) / r3.elements[0], F2.y = (Math.sign(D2.y) + r3.elements[9]) / r3.elements[5], F2.z = -1, F2.w = (1 + r3.elements[10]) / r3.elements[14], D2.multiplyScalar(2 / D2.dot(F2)), r3.elements[2] = D2.x, r3.elements[6] = D2.y, r3.elements[10] = D2.z + 1, r3.elements[14] = D2.w;
      }, [x2, p2]), [j2, V2, O2, I2] = M.useMemo(() => {
        const o2 = { minFilter: n.LinearFilter, magFilter: n.LinearFilter, encoding: g2.outputEncoding, type: n.HalfFloatType }, p3 = new n.WebGLRenderTarget(r2, r2, o2);
        p3.depthBuffer = true, p3.depthTexture = new n.DepthTexture(r2, r2), p3.depthTexture.format = n.DepthFormat, p3.depthTexture.type = n.UnsignedShortType;
        const h3 = new n.WebGLRenderTarget(r2, r2, o2);
        return [p3, h3, new St({ gl: g2, resolution: r2, width: a2[0], height: a2[1], minDepthThreshold: i2, maxDepthThreshold: s2, depthScale: c2, depthToBlurRatioBias: l2 }), { mirror: u2, textureMatrix: B2, mixBlur: e2, tDiffuse: p3.texture, tDepth: p3.depthTexture, tDiffuseBlur: h3.texture, hasBlur: E2, mixStrength: t2, minDepthThreshold: i2, maxDepthThreshold: s2, depthScale: c2, depthToBlurRatioBias: l2, distortion: d2, distortionMap: f2, mixContrast: m2, "defines-USE_BLUR": E2 ? "" : void 0, "defines-USE_DEPTH": c2 > 0 ? "" : void 0, "defines-USE_DISTORTION": f2 ? "" : void 0 }];
      }, [g2, a2, B2, r2, u2, E2, e2, t2, i2, s2, c2, l2, d2, f2, m2]);
      return o.useFrame(() => {
        var e3;
        const t3 = w2.current.parent || ((e3 = w2.current) == null ? void 0 : e3.__r3f.parent);
        if (!t3)
          return;
        t3.visible = false;
        const r3 = g2.xr.enabled, n2 = g2.shadowMap.autoUpdate;
        U2(), g2.xr.enabled = false, g2.shadowMap.autoUpdate = false, g2.setRenderTarget(j2), g2.state.buffers.depth.setMask(true), g2.autoClear || g2.clear(), g2.render(y2, k2), E2 && O2.render(g2, j2, V2), g2.xr.enabled = r3, g2.shadowMap.autoUpdate = n2, t3.visible = true, g2.setRenderTarget(null);
      }), M.createElement("meshReflectorMaterialImpl", b.default({ attach: "material", key: "key" + I2["defines-USE_BLUR"] + I2["defines-USE_DEPTH"] + I2["defines-USE_DISTORTION"], ref: C.default([w2, v2]) }, I2, h2));
    });
    var Ct = class extends T.PointsMaterial {
      constructor(e2) {
        super(e2), this.onBeforeCompile = (e3) => {
          e3.fragmentShader = e3.fragmentShader.replace("#include <output_fragment>", "\n        #include <output_fragment>\n      vec2 cxy = 2.0 * gl_PointCoord - 1.0;\n      float r = dot(cxy, cxy);\n      float delta = fwidth(r);     \n      float mask = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);\n      gl_FragColor = vec4(gl_FragColor.rgb, mask * gl_FragColor.a );\n      ");
        };
      }
    };
    var Rt = M.forwardRef((e2, t2) => {
      const [r2] = M.useState(() => new Ct(null));
      return M.createElement("primitive", b.default({}, e2, { object: r2, ref: t2, attach: "material" }));
    });
    var _t = false;
    function Lt(e2) {
      const t2 = e2 + "BufferGeometry";
      return M.forwardRef((_a, o2) => {
        var _b = _a, { args: e3, children: r2 } = _b, n2 = __objRest(_b, ["args", "children"]);
        return M.createElement("mesh", b.default({ ref: o2 }, n2), M.createElement(t2, { attach: "geometry", args: e3 }), r2);
      });
    }
    var Dt = Lt("box");
    var zt = Lt("circle");
    var At = Lt("cone");
    var Ft = Lt("cylinder");
    var Bt = Lt("sphere");
    var kt = Lt("plane");
    var Ut = Lt("tube");
    var jt = Lt("torus");
    var Vt = Lt("torusKnot");
    var Ot = Lt("tetrahedron");
    var It = Lt("ring");
    var Wt = Lt("polyhedron");
    var Nt = Lt("icosahedron");
    var Gt = Lt("octahedron");
    var Ht = Lt("dodecahedron");
    var $t = Lt("extrude");
    var qt = Lt("lathe");
    var Xt = Lt("capsule");
    var Yt = 1e-5;
    var Zt = M.forwardRef(function(_a, l2) {
      var _b = _a, { args: [e2 = 1, t2 = 1, r2 = 1] = [], radius: o2 = 0.05, steps: a2 = 1, smoothness: i2 = 4, children: s2 } = _b, c2 = __objRest(_b, ["args", "radius", "steps", "smoothness", "children"]);
      const u2 = M.useMemo(() => function(e3, t3, r3) {
        const o3 = new n.Shape(), a3 = r3 - Yt;
        return o3.absarc(Yt, Yt, Yt, -Math.PI / 2, -Math.PI, true), o3.absarc(Yt, t3 - 2 * a3, Yt, Math.PI, Math.PI / 2, true), o3.absarc(e3 - 2 * a3, t3 - 2 * a3, Yt, Math.PI / 2, 0, true), o3.absarc(e3 - 2 * a3, Yt, Yt, 0, -Math.PI / 2, true), o3;
      }(e2, t2, o2), [e2, t2, o2]), d2 = M.useMemo(() => ({ depth: r2 - 2 * o2, bevelEnabled: true, bevelSegments: 2 * i2, steps: a2, bevelSize: o2 - Yt, bevelThickness: o2, curveSegments: i2 }), [r2, o2, i2]), m2 = M.useRef();
      return M.useLayoutEffect(() => {
        m2.current && m2.current.center();
      }, [u2, d2]), M.createElement("mesh", b.default({ ref: l2 }, c2), M.createElement("extrudeGeometry", { ref: m2, args: [u2, d2] }), s2);
    });
    function Kt() {
      const e2 = new T.BufferGeometry(), t2 = new Float32Array([-1, -1, 3, -1, -1, 3]);
      return e2.setAttribute("position", new T.BufferAttribute(t2, 2)), e2;
    }
    var Jt = M.forwardRef(function(_a, r2) {
      var _b = _a, { children: e2 } = _b, t2 = __objRest(_b, ["children"]);
      const n2 = M.useMemo(Kt, []);
      return M.createElement("mesh", b.default({ ref: r2, geometry: n2, frustumCulled: false }, t2), e2);
    });
    var Qt = M.forwardRef(function(_a, o2) {
      var _b = _a, { children: e2, alignTop: t2 } = _b, r2 = __objRest(_b, ["children", "alignTop"]);
      const a2 = M.useRef(null), i2 = M.useRef(null);
      return M.useLayoutEffect(() => {
        a2.current.position.set(0, 0, 0), a2.current.updateWorldMatrix(true, true);
        const e3 = new n.Box3().setFromObject(i2.current), r3 = new n.Vector3(), o3 = new n.Sphere(), s2 = e3.max.y - e3.min.y;
        e3.getCenter(r3), e3.getBoundingSphere(o3), a2.current.position.set(-r3.x, -r3.y + (t2 ? s2 / 2 : 0), -r3.z);
      }, [e2]), M.createElement("group", b.default({ ref: o2 }, r2), M.createElement("group", { ref: a2 }, M.createElement("group", { ref: i2 }, e2)));
    });
    var er = (e2) => e2 && e2.isOrthographicCamera;
    var tr = M.createContext(null);
    var rr = M.forwardRef(({ intensity: e2 = 1, decay: t2, decayRate: r2 = 0.65, maxYaw: n2 = 0.1, maxPitch: a2 = 0.1, maxRoll: i2 = 0.1, yawFrequency: s2 = 0.1, pitchFrequency: c2 = 0.1, rollFrequency: u2 = 0.1 }, d2) => {
      const m2 = o.useThree((e3) => e3.camera), f2 = o.useThree((e3) => e3.controls), p2 = M.useRef(e2), h2 = M.useRef(m2.rotation.clone()), [v2] = M.useState(() => new l.SimplexNoise()), [g2] = M.useState(() => new l.SimplexNoise()), [x2] = M.useState(() => new l.SimplexNoise()), y2 = () => {
        (p2.current < 0 || p2.current > 1) && (p2.current = p2.current < 0 ? 0 : 1);
      };
      return M.useImperativeHandle(d2, () => ({ getIntensity: () => p2.current, setIntensity: (e3) => {
        p2.current = e3, y2();
      } }), []), M.useEffect(() => {
        if (f2) {
          const e3 = () => {
            h2.current = m2.rotation.clone();
          };
          return f2.addEventListener("change", e3), e3(), () => {
            f2.removeEventListener("change", e3);
          };
        }
      }, [m2, f2]), o.useFrame((e3, o2) => {
        const l2 = Math.pow(p2.current, 2), d3 = n2 * l2 * v2.noise(e3.clock.elapsedTime * s2, 1), f3 = a2 * l2 * g2.noise(e3.clock.elapsedTime * c2, 1), E2 = i2 * l2 * x2.noise(e3.clock.elapsedTime * u2, 1);
        m2.rotation.set(h2.current.x + f3, h2.current.y + d3, h2.current.z + E2), t2 && p2.current > 0 && (p2.current -= r2 * o2, y2());
      }), null;
    });
    var nr = M.forwardRef((_a, s2) => {
      var _b = _a, { children: e2, speed: t2 = 1, rotationIntensity: r2 = 1, floatIntensity: n2 = 1, floatingRange: a2 = [-0.1, 0.1] } = _b, i2 = __objRest(_b, ["children", "speed", "rotationIntensity", "floatIntensity", "floatingRange"]);
      const c2 = M.useRef(null), l2 = M.useRef(1e4 * Math.random());
      return o.useFrame((e3) => {
        var o2, i3;
        const s3 = l2.current + e3.clock.getElapsedTime();
        c2.current.rotation.x = Math.cos(s3 / 4 * t2) / 8 * r2, c2.current.rotation.y = Math.sin(s3 / 4 * t2) / 8 * r2, c2.current.rotation.z = Math.sin(s3 / 4 * t2) / 20 * r2;
        let u2 = Math.sin(s3 / 4 * t2) / 10;
        u2 = T.MathUtils.mapLinear(u2, -0.1, 0.1, (o2 = a2 == null ? void 0 : a2[0]) !== null && o2 !== void 0 ? o2 : -0.1, (i3 = a2 == null ? void 0 : a2[1]) !== null && i3 !== void 0 ? i3 : 0.1), c2.current.position.y = u2 * n2;
      }), M.createElement("group", i2, M.createElement("group", { ref: C.default([c2, s2]) }, e2));
    });
    var or = { sunset: "venice/venice_sunset_1k.hdr", dawn: "kiara/kiara_1_dawn_1k.hdr", night: "dikhololo/dikhololo_night_1k.hdr", warehouse: "empty-wharehouse/empty_warehouse_01_1k.hdr", forest: "forrest-slope/forest_slope_1k.hdr", apartment: "lebombo/lebombo_1k.hdr", studio: "studio-small-3/studio_small_03_1k.hdr", city: "potsdamer-platz/potsdamer_platz_1k.hdr", park: "rooitou/rooitou_park_1k.hdr", lobby: "st-fagans/st_fagans_interior_1k.hdr" };
    var ar = (e2) => {
      return (t2 = e2).current && t2.current.isScene ? e2.current : e2;
      var t2;
    };
    function ir({ scene: e2, background: t2 = false, map: r2 }) {
      const n2 = o.useThree((e3) => e3.scene);
      return M.useLayoutEffect(() => {
        if (r2) {
          const o2 = ar(e2 || n2), a2 = o2.background, i2 = o2.environment;
          return t2 !== "only" && (o2.environment = r2), t2 && (o2.background = r2), () => {
            t2 !== "only" && (o2.environment = i2), t2 && (o2.background = a2);
          };
        }
      }, [n2, e2, r2, t2]), null;
    }
    function sr({ files: e2 = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"], path: t2 = "", preset: r2, extensions: a2 }) {
      if (r2) {
        if (!(r2 in or))
          throw new Error("Preset must be one of: " + Object.keys(or).join(", "));
        e2 = or[r2], t2 = "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/hdris/";
      }
      const i2 = Array.isArray(e2), s2 = i2 ? n.CubeTextureLoader : l.RGBELoader, c2 = o.useLoader(s2, i2 ? [e2] : e2, (e3) => {
        e3.setPath(t2), a2 && a2(e3);
      }), u2 = i2 ? c2[0] : c2;
      return u2.mapping = i2 ? n.CubeReflectionMapping : n.EquirectangularReflectionMapping, u2;
    }
    function cr(_a) {
      var _b = _a, { background: e2 = false, scene: t2 } = _b, r2 = __objRest(_b, ["background", "scene"]);
      const n2 = sr(r2), a2 = o.useThree((e3) => e3.scene);
      return M.useLayoutEffect(() => {
        const r3 = ar(t2 || a2), o2 = r3.background, i2 = r3.environment;
        return e2 !== "only" && (r3.environment = n2), e2 && (r3.background = n2), () => {
          e2 !== "only" && (r3.environment = i2), e2 && (r3.background = o2);
        };
      }, [n2, e2, t2, a2]), null;
    }
    function lr({ children: e2, near: t2 = 1, far: r2 = 1e3, resolution: a2 = 256, frames: i2 = 1, map: s2, background: c2 = false, scene: l2, files: u2, path: d2, preset: m2, extensions: f2 }) {
      const p2 = o.useThree((e3) => e3.gl), h2 = o.useThree((e3) => e3.scene), v2 = M.useRef(null), [g2] = M.useState(() => new n.Scene()), x2 = M.useMemo(() => {
        const e3 = new n.WebGLCubeRenderTarget(a2);
        return e3.texture.type = n.HalfFloatType, e3;
      }, [a2]);
      M.useLayoutEffect(() => {
        i2 === 1 && v2.current.update(p2, g2);
        const e3 = ar(l2 || h2), t3 = e3.background, r3 = e3.environment;
        return c2 !== "only" && (e3.environment = x2.texture), c2 && (e3.background = x2.texture), () => {
          c2 !== "only" && (e3.environment = r3), c2 && (e3.background = t3);
        };
      }, [e2, g2, x2.texture, l2, h2, c2, i2, p2]);
      let y2 = 1;
      return o.useFrame(() => {
        (i2 === 1 / 0 || y2 < i2) && (v2.current.update(p2, g2), y2++);
      }), M.createElement(M.Fragment, null, o.createPortal(M.createElement(M.Fragment, null, e2, M.createElement("cubeCamera", { ref: v2, args: [t2, r2, x2] }), u2 || m2 ? M.createElement(cr, { background: true, files: u2, preset: m2, path: d2, extensions: f2 }) : s2 ? M.createElement(ir, { background: true, map: s2, extensions: f2 }) : null), g2));
    }
    function ur(e2) {
      var t2, r2, o2, a2;
      const i2 = sr(e2), s2 = e2.map || i2, c2 = (l2 = s2) && l2.isCubeTexture;
      var l2;
      const u2 = M.useMemo(() => {
        var e3, t3;
        const r3 = ((e3 = c2 ? (t3 = s2.image[0]) == null ? void 0 : t3.width : s2.image.width) !== null && e3 !== void 0 ? e3 : 1024) / 4, n2 = Math.floor(Math.log2(r3)), o3 = Math.pow(2, n2), a3 = 3 * Math.max(o3, 112);
        return [c2 ? "#define ENVMAP_TYPE_CUBE" : "", "#define CUBEUV_TEXEL_WIDTH " + 1 / a3, "#define CUBEUV_TEXEL_HEIGHT " + 1 / (4 * o3), `#define CUBEUV_MAX_MIP ${n2}.0`, ""];
      }, []), d2 = M.useMemo(() => u2.join("\n") + "#define GLSLIFY 1\n#define ENVMAP_TYPE_CUBE_UV\nvarying vec3 vWorldPosition;uniform float radius;uniform float height;\n#ifdef ENVMAP_TYPE_CUBE\nuniform samplerCube cubemap;\n#else\nuniform sampler2D cubemap;\n#endif\nfloat diskIntersect(in vec3 ro,in vec3 rd,vec3 c,vec3 n,float r){vec3 o=ro-c;float t=-dot(n,o)/dot(rd,n);vec3 q=o+rd*t;return(dot(q,q)<r*r)? t : 1e6;}float sphereIntersect(in vec3 ro,in vec3 rd,in vec3 ce,float ra){vec3 oc=ro-ce;float b=dot(oc,rd);float c=dot(oc,oc)-ra*ra;float h=b*b-c;if(h<0.0)-1.0;h=sqrt(h);return-b+h;}vec3 project(){vec3 p=normalize(vWorldPosition);vec3 camPos=cameraPosition;camPos.y-=height;float intersection=sphereIntersect(camPos,p,vec3(0.),radius);if(intersection>0.){vec3 h=vec3(0.0,-height,0.0);float intersection2=diskIntersect(camPos,p,h,vec3(0.0,-1.0,0.0),radius);p=(camPos+min(intersection,intersection2)*p)/radius;}else{p=vec3(0.0,1.0,0.0);}return p;}\n#include <common>\n#include <cube_uv_reflection_fragment>\nvoid main(){vec3 projectedWorldPosition=project();\n#ifdef ENVMAP_TYPE_CUBE\nvec3 outcolor=textureCube(cubemap,projectedWorldPosition).rgb;\n#else\nvec3 direction=normalize(projectedWorldPosition);vec2 uv=equirectUv(direction);vec3 outcolor=texture2D(cubemap,uv).rgb;\n#endif\ngl_FragColor=vec4(outcolor,1.0);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}", [u2]), m2 = M.useMemo(() => ({ cubemap: { value: null }, height: { value: 15 }, radius: { value: 60 } }), []), f2 = M.useRef(null), p2 = (t2 = e2.ground) == null ? void 0 : t2.height, h2 = (r2 = e2.ground) == null ? void 0 : r2.radius, v2 = (o2 = (a2 = e2.ground) == null ? void 0 : a2.scale) !== null && o2 !== void 0 ? o2 : 1e3;
      return M.useEffect(() => {
        p2 && (f2.current.uniforms.height.value = p2);
      }, [p2]), M.useEffect(() => {
        h2 && (f2.current.uniforms.radius.value = h2);
      }, [h2]), M.useEffect(() => {
        f2.current.uniforms.cubemap.value = s2;
      }, [s2]), M.createElement(M.Fragment, null, M.createElement(ir, b.default({}, e2, { map: s2 })), M.createElement(Nt, { scale: v2, args: [1, 16] }, M.createElement("shaderMaterial", { ref: f2, side: n.BackSide, vertexShader: "#define GLSLIFY 1\nvarying vec3 vWorldPosition;void main(){vec4 worldPosition=modelMatrix*vec4(position,1.0);vWorldPosition=worldPosition.xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}", fragmentShader: d2, uniforms: m2 })));
    }
    function dr(e2) {
      return e2.ground ? M.createElement(ur, e2) : e2.map ? M.createElement(ir, e2) : e2.children ? M.createElement(lr, e2) : M.createElement(cr, e2);
    }
    var mr = M.forwardRef((_a, h2) => {
      var _b = _a, { scale: e2 = 10, frames: t2 = 1 / 0, opacity: r2 = 1, width: n2 = 1, height: a2 = 1, blur: i2 = 1, far: s2 = 10, resolution: c2 = 512, smooth: u2 = true, color: d2 = "#000000", depthWrite: m2 = false, renderOrder: f2 } = _b, p2 = __objRest(_b, ["scale", "frames", "opacity", "width", "height", "blur", "far", "resolution", "smooth", "color", "depthWrite", "renderOrder"]);
      const v2 = o.useThree((e3) => e3.scene), g2 = o.useThree((e3) => e3.gl), x2 = M.useRef(null);
      n2 *= Array.isArray(e2) ? e2[0] : e2 || 1, a2 *= Array.isArray(e2) ? e2[1] : e2 || 1;
      const [y2, E2, w2, S2, P2, C2, R2] = M.useMemo(() => {
        const e3 = new T.WebGLRenderTarget(c2, c2), t3 = new T.WebGLRenderTarget(c2, c2);
        t3.texture.generateMipmaps = e3.texture.generateMipmaps = false;
        const r3 = new T.PlaneBufferGeometry(n2, a2).rotateX(Math.PI / 2), o2 = new T.Mesh(r3), i3 = new T.MeshDepthMaterial();
        i3.depthTest = i3.depthWrite = false, i3.onBeforeCompile = (e4) => {
          e4.uniforms = __spreadProps(__spreadValues({}, e4.uniforms), { ucolor: { value: new T.Color(d2).convertSRGBToLinear() } }), e4.fragmentShader = e4.fragmentShader.replace("void main() {", "uniform vec3 ucolor;\n           void main() {\n          "), e4.fragmentShader = e4.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );", "vec4( ucolor, ( 1.0 - fragCoordZ ) * 1.0 );");
        };
        const s3 = new T.ShaderMaterial(l.HorizontalBlurShader), u3 = new T.ShaderMaterial(l.VerticalBlurShader);
        return u3.depthTest = s3.depthTest = false, [e3, r3, i3, o2, s3, u3, t3];
      }, [c2, n2, a2, e2, d2]), _2 = (e3) => {
        S2.visible = true, S2.material = P2, P2.uniforms.tDiffuse.value = y2.texture, P2.uniforms.h.value = 1 * e3 / 256, g2.setRenderTarget(R2), g2.render(S2, x2.current), S2.material = C2, C2.uniforms.tDiffuse.value = R2.texture, C2.uniforms.v.value = 1 * e3 / 256, g2.setRenderTarget(y2), g2.render(S2, x2.current), S2.visible = false;
      };
      let L2 = 0;
      return o.useFrame(() => {
        if (x2.current && (t2 === 1 / 0 || L2 < t2)) {
          const e3 = v2.background;
          v2.background = null;
          const t3 = v2.overrideMaterial;
          v2.overrideMaterial = w2, g2.setRenderTarget(y2), g2.render(v2, x2.current), v2.overrideMaterial = t3, _2(i2), u2 && _2(0.4 * i2), g2.setRenderTarget(null), v2.background = e3, L2++;
        }
      }), M.createElement("group", b.default({ "rotation-x": Math.PI / 2 }, p2, { ref: h2 }), M.createElement("mesh", { renderOrder: f2, geometry: E2, scale: [1, -1, 1], rotation: [-Math.PI / 2, 0, 0] }, M.createElement("meshBasicMaterial", { map: y2.texture, "map-encoding": g2.outputEncoding, transparent: true, opacity: r2, depthWrite: m2 })), M.createElement("orthographicCamera", { ref: x2, args: [-n2 / 2, n2 / 2, a2 / 2, -a2 / 2, 0, s2] }));
    });
    var fr = { rembrandt: { main: [1, 2, 1], fill: [-2, -0.5, -2] }, portrait: { main: [-1, 2, 0.5], fill: [-1, 0.5, -1.5] }, upfront: { main: [0, 2, 1], fill: [-1, 0.5, -1.5] }, soft: { main: [-2, 4, 4], fill: [-1, 0.5, -1.5] } };
    var pr = (e2) => e2 === 0 ? 0 : Math.pow(2, 10 * e2 - 10);
    var hr = M.forwardRef((_a, c2) => {
      var _b = _a, { fog: e2 = false, renderOrder: t2, depthWrite: r2 = false, colorStop: o2 = 0, color: a2 = "black", opacity: i2 = 0.5 } = _b, s2 = __objRest(_b, ["fog", "renderOrder", "depthWrite", "colorStop", "color", "opacity"]);
      const l2 = M.useMemo(() => {
        const e3 = document.createElement("canvas");
        e3.width = 128, e3.height = 128;
        const t3 = e3.getContext("2d"), r3 = t3.createRadialGradient(e3.width / 2, e3.height / 2, 0, e3.width / 2, e3.height / 2, e3.width / 2);
        return r3.addColorStop(o2, new n.Color(a2).getStyle()), r3.addColorStop(1, "rgba(0,0,0,0)"), t3.fillStyle = r3, t3.fillRect(0, 0, e3.width, e3.height), e3;
      }, [a2, o2]);
      return M.createElement("mesh", b.default({ renderOrder: t2, ref: c2, "rotation-x": -Math.PI / 2 }, s2), M.createElement("planeGeometry", null), M.createElement("meshBasicMaterial", { transparent: true, opacity: i2, fog: e2, depthWrite: r2, side: n.DoubleSide }, M.createElement("canvasTexture", { attach: "map", args: [l2] })));
    });
    o.extend({ MeshReflectorMaterial: Tt });
    var vr = M.forwardRef((_a, x2) => {
      var _b = _a, { mixBlur: e2 = 0, mixStrength: t2 = 0.5, resolution: r2 = 256, blur: a2 = [0, 0], args: i2 = [1, 1], minDepthThreshold: s2 = 0.9, maxDepthThreshold: c2 = 1, depthScale: l2 = 0, depthToBlurRatioBias: u2 = 0.25, mirror: d2 = 0, children: m2, debug: f2 = 0, distortion: p2 = 1, mixContrast: h2 = 1, distortionMap: v2 } = _b, g2 = __objRest(_b, ["mixBlur", "mixStrength", "resolution", "blur", "args", "minDepthThreshold", "maxDepthThreshold", "depthScale", "depthToBlurRatioBias", "mirror", "children", "debug", "distortion", "mixContrast", "distortionMap"]);
      M.useEffect(() => {
        console.warn("Reflector has been deprecated and will be removed next major. Replace it with <MeshReflectorMaterial />!");
      }, []);
      const y2 = o.useThree(({ gl: e3 }) => e3), E2 = o.useThree(({ camera: e3 }) => e3), w2 = o.useThree(({ scene: e3 }) => e3), S2 = (a2 = Array.isArray(a2) ? a2 : [a2, a2])[0] + a2[1] > 0, T2 = M.useRef(null), [P2] = M.useState(() => new n.Plane()), [R2] = M.useState(() => new n.Vector3()), [_2] = M.useState(() => new n.Vector3()), [L2] = M.useState(() => new n.Vector3()), [D2] = M.useState(() => new n.Matrix4()), [z2] = M.useState(() => new n.Vector3(0, 0, -1)), [A2] = M.useState(() => new n.Vector4()), [F2] = M.useState(() => new n.Vector3()), [B2] = M.useState(() => new n.Vector3()), [k2] = M.useState(() => new n.Vector4()), [U2] = M.useState(() => new n.Matrix4()), [j2] = M.useState(() => new n.PerspectiveCamera()), V2 = M.useCallback(() => {
        if (_2.setFromMatrixPosition(T2.current.matrixWorld), L2.setFromMatrixPosition(E2.matrixWorld), D2.extractRotation(T2.current.matrixWorld), R2.set(0, 0, 1), R2.applyMatrix4(D2), F2.subVectors(_2, L2), F2.dot(R2) > 0)
          return;
        F2.reflect(R2).negate(), F2.add(_2), D2.extractRotation(E2.matrixWorld), z2.set(0, 0, -1), z2.applyMatrix4(D2), z2.add(L2), B2.subVectors(_2, z2), B2.reflect(R2).negate(), B2.add(_2), j2.position.copy(F2), j2.up.set(0, 1, 0), j2.up.applyMatrix4(D2), j2.up.reflect(R2), j2.lookAt(B2), j2.far = E2.far, j2.updateMatrixWorld(), j2.projectionMatrix.copy(E2.projectionMatrix), U2.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), U2.multiply(j2.projectionMatrix), U2.multiply(j2.matrixWorldInverse), U2.multiply(T2.current.matrixWorld), P2.setFromNormalAndCoplanarPoint(R2, _2), P2.applyMatrix4(j2.matrixWorldInverse), A2.set(P2.normal.x, P2.normal.y, P2.normal.z, P2.constant);
        const e3 = j2.projectionMatrix;
        k2.x = (Math.sign(A2.x) + e3.elements[8]) / e3.elements[0], k2.y = (Math.sign(A2.y) + e3.elements[9]) / e3.elements[5], k2.z = -1, k2.w = (1 + e3.elements[10]) / e3.elements[14], A2.multiplyScalar(2 / A2.dot(k2)), e3.elements[2] = A2.x, e3.elements[6] = A2.y, e3.elements[10] = A2.z + 1, e3.elements[14] = A2.w;
      }, []), [O2, I2, W2, N2] = M.useMemo(() => {
        const o2 = { minFilter: n.LinearFilter, magFilter: n.LinearFilter, encoding: y2.outputEncoding }, i3 = new n.WebGLRenderTarget(r2, r2, o2);
        i3.depthBuffer = true, i3.depthTexture = new n.DepthTexture(r2, r2), i3.depthTexture.format = n.DepthFormat, i3.depthTexture.type = n.UnsignedShortType;
        const m3 = new n.WebGLRenderTarget(r2, r2, o2);
        return [i3, m3, new St({ gl: y2, resolution: r2, width: a2[0], height: a2[1], minDepthThreshold: s2, maxDepthThreshold: c2, depthScale: l2, depthToBlurRatioBias: u2 }), { mirror: d2, textureMatrix: U2, mixBlur: e2, tDiffuse: i3.texture, tDepth: i3.depthTexture, tDiffuseBlur: m3.texture, hasBlur: S2, mixStrength: t2, minDepthThreshold: s2, maxDepthThreshold: c2, depthScale: l2, depthToBlurRatioBias: u2, transparent: true, debug: f2, distortion: p2, distortionMap: v2, mixContrast: h2, "defines-USE_BLUR": S2 ? "" : void 0, "defines-USE_DEPTH": l2 > 0 ? "" : void 0, "defines-USE_DISTORTION": v2 ? "" : void 0 }];
      }, [y2, a2, U2, r2, d2, S2, e2, t2, s2, c2, l2, u2, f2, p2, v2, h2]);
      return o.useFrame(() => {
        if (T2 == null || !T2.current)
          return;
        T2.current.visible = false;
        const e3 = y2.xr.enabled, t3 = y2.shadowMap.autoUpdate;
        V2(), y2.xr.enabled = false, y2.shadowMap.autoUpdate = false, y2.setRenderTarget(O2), y2.state.buffers.depth.setMask(true), y2.autoClear || y2.clear(), y2.render(w2, j2), S2 && W2.render(y2, O2, I2), y2.xr.enabled = e3, y2.shadowMap.autoUpdate = t3, T2.current.visible = true, y2.setRenderTarget(null);
      }), M.createElement("mesh", b.default({ ref: C.default([T2, x2]) }, g2), M.createElement("planeBufferGeometry", { args: i2 }), m2 ? m2("meshReflectorMaterial", N2) : M.createElement("meshReflectorMaterial", N2));
    });
    var gr = class extends n.ShaderMaterial {
      constructor() {
        super({ uniforms: { depth: { value: null }, opacity: { value: 1 }, attenuation: { value: 2.5 }, anglePower: { value: 12 }, spotPosition: { value: new n.Vector3(0, 0, 0) }, lightColor: { value: new n.Color("white") }, cameraNear: { value: 0 }, cameraFar: { value: 1 }, resolution: { value: new n.Vector2(0, 0) } }, transparent: true, depthWrite: false, vertexShader: "\n      varying vec3 vNormal;\n      varying vec3 vWorldPosition;\n      varying float vViewZ;\n      varying float vIntensity;\n      uniform vec3 spotPosition;\n      uniform float attenuation;      \n\n      void main() {\n        // compute intensity\n        vNormal = normalize( normalMatrix * normal );\n        vec4 worldPosition	= modelMatrix * vec4( position, 1.0 );\n        vWorldPosition = worldPosition.xyz;\n        vec4 viewPosition = viewMatrix * worldPosition;\n        vViewZ = viewPosition.z;\n        float intensity	= distance(worldPosition.xyz, spotPosition) / attenuation;\n        intensity	= 1.0 - clamp(intensity, 0.0, 1.0);\n        vIntensity = intensity;        \n        // set gl_Position\n        gl_Position	= projectionMatrix * viewPosition;\n\n      }", fragmentShader: "\n      #include <packing>\n\n      varying vec3 vNormal;\n      varying vec3 vWorldPosition;\n      uniform vec3 lightColor;\n      uniform vec3 spotPosition;\n      uniform float attenuation;\n      uniform float anglePower;\n      uniform sampler2D depth;\n      uniform vec2 resolution;\n      uniform float cameraNear;\n      uniform float cameraFar;\n      varying float vViewZ;\n      varying float vIntensity;\n      uniform float opacity;\n\n      float readDepth( sampler2D depthSampler, vec2 coord ) {\n        float fragCoordZ = texture2D( depthSampler, coord ).x;\n        float viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);\n        return viewZ;\n      }\n\n      void main() {\n        float d = 1.0;\n        bool isSoft = resolution[0] > 0.0 && resolution[1] > 0.0;\n        if (isSoft) {\n          vec2 sUv = gl_FragCoord.xy / resolution;\n          d = readDepth(depth, sUv);\n        }\n        float intensity = vIntensity;\n        vec3 normal	= vec3(vNormal.x, vNormal.y, abs(vNormal.z));\n        float angleIntensity	= pow( dot(normal, vec3(0.0, 0.0, 1.0)), anglePower );\n        intensity	*= angleIntensity;\n        // fades when z is close to sampled depth, meaning the cone is intersecting existing geometry\n        if (isSoft) {\n          intensity	*= smoothstep(0., 1., vViewZ - d);\n        }\n        gl_FragColor = vec4(lightColor, intensity * opacity);\n\n        #include <tonemapping_fragment>\n	      #include <encodings_fragment>\n      }" });
      }
    };
    var xr = new n.Vector3();
    var yr = M.forwardRef((_a, m2) => {
      var _b = _a, { opacity: e2 = 1, radiusTop: t2, radiusBottom: r2, depthBuffer: a2, color: i2 = "white", distance: s2 = 5, angle: c2 = 0.15, attenuation: l2 = 5, anglePower: u2 = 5 } = _b, d2 = __objRest(_b, ["opacity", "radiusTop", "radiusBottom", "depthBuffer", "color", "distance", "angle", "attenuation", "anglePower"]);
      const f2 = M.useRef(null), p2 = o.useThree((e3) => e3.size), h2 = o.useThree((e3) => e3.camera), v2 = o.useThree((e3) => e3.viewport.dpr), [g2] = M.useState(() => new gr());
      t2 = t2 === void 0 ? 0.1 : t2, r2 = r2 === void 0 ? 7 * c2 : r2, o.useFrame(() => {
        g2.uniforms.spotPosition.value.copy(f2.current.getWorldPosition(xr)), f2.current.lookAt(f2.current.parent.target.getWorldPosition(xr));
      });
      const x2 = M.useMemo(() => {
        const e3 = new n.CylinderGeometry(t2, r2, s2, 128, 64, true);
        return e3.applyMatrix4(new n.Matrix4().makeTranslation(0, -s2 / 2, 0)), e3.applyMatrix4(new n.Matrix4().makeRotationX(-Math.PI / 2)), e3;
      }, [c2, s2, t2, r2]);
      return M.createElement("spotLight", b.default({ ref: m2, angle: c2, color: i2, distance: s2 }, d2), M.createElement("mesh", { ref: f2, geometry: x2, raycast: () => null }, M.createElement("primitive", { object: g2, attach: "material", "uniforms-opacity-value": e2, "uniforms-lightColor-value": i2, "uniforms-attenuation-value": l2, "uniforms-anglePower-value": u2, "uniforms-depth-value": a2, "uniforms-cameraNear-value": h2.near, "uniforms-cameraFar-value": h2.far, "uniforms-resolution-value": a2 ? [p2.width * v2, p2.height * v2] : [0, 0] })));
    });
    var Er = M.forwardRef((_a, d2) => {
      var _b = _a, { args: e2, map: t2, toneMapped: r2 = false, color: n2 = "white", form: a2 = "rect", intensity: i2 = 1, scale: s2 = 1, target: c2, children: l2 } = _b, u2 = __objRest(_b, ["args", "map", "toneMapped", "color", "form", "intensity", "scale", "target", "children"]);
      const m2 = M.useRef(null);
      return M.useLayoutEffect(() => {
        l2 || u2.material || (o.applyProps(m2.current.material, { color: n2 }), m2.current.material.color.multiplyScalar(i2));
      }, [n2, i2, l2, u2.material]), M.useLayoutEffect(() => {
        c2 && m2.current.lookAt(Array.isArray(c2) ? new T.Vector3(...c2) : c2);
      }, [c2]), s2 = Array.isArray(s2) && s2.length === 2 ? [s2[0], s2[1], 1] : s2, M.createElement("mesh", b.default({ ref: C.default([m2, d2]), scale: s2 }, u2), a2 === "circle" ? M.createElement("ringGeometry", { args: [0, 1, 64] }) : a2 === "ring" ? M.createElement("ringGeometry", { args: [0.5, 1, 64] }) : a2 === "rect" ? M.createElement("planeGeometry", null) : M.createElement(a2, { args: e2 }), l2 || (u2.material ? null : M.createElement("meshBasicMaterial", { toneMapped: r2, map: t2, side: T.DoubleSide })));
    });
    function wr(e2, t2, r2 = new n.Vector3()) {
      const o2 = Math.PI * (e2 - 0.5), a2 = 2 * Math.PI * (t2 - 0.5);
      return r2.x = Math.cos(a2), r2.y = Math.sin(o2), r2.z = Math.sin(a2), r2;
    }
    var br = M.forwardRef((_a, d2) => {
      var _b = _a, { inclination: e2 = 0.6, azimuth: t2 = 0.1, distance: r2 = 1e3, mieCoefficient: o2 = 5e-3, mieDirectionalG: a2 = 0.8, rayleigh: i2 = 0.5, turbidity: s2 = 10, sunPosition: c2 = wr(e2, t2) } = _b, u2 = __objRest(_b, ["inclination", "azimuth", "distance", "mieCoefficient", "mieDirectionalG", "rayleigh", "turbidity", "sunPosition"]);
      const m2 = M.useMemo(() => new n.Vector3().setScalar(r2), [r2]), [f2] = M.useState(() => new l.Sky());
      return M.createElement("primitive", b.default({ object: f2, ref: d2, "material-uniforms-mieCoefficient-value": o2, "material-uniforms-mieDirectionalG-value": a2, "material-uniforms-rayleigh-value": i2, "material-uniforms-sunPosition-value": c2, "material-uniforms-turbidity-value": s2, scale: m2 }, u2));
    });
    var Mr = class extends n.ShaderMaterial {
      constructor() {
        super({ uniforms: { time: { value: 0 }, fade: { value: 1 } }, vertexShader: "\n      uniform float time;\n      attribute float size;\n      varying vec3 vColor;\n      void main() {\n        vColor = color;\n        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);\n        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(mvPosition.x + 2.0 * time + 100.0));\n        gl_Position = projectionMatrix * mvPosition;\n      }", fragmentShader: "\n      uniform sampler2D pointTexture;\n      uniform float fade;\n      varying vec3 vColor;\n      void main() {\n        float opacity = 1.0;\n        if (fade == 1.0) {\n          float d = distance(gl_PointCoord, vec2(0.5, 0.5));\n          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));\n        }\n        gl_FragColor = vec4(vColor, opacity);\n\n        #include <tonemapping_fragment>\n	      #include <encodings_fragment>\n      }" });
      }
    };
    var Sr = (e2) => new n.Vector3().setFromSpherical(new n.Spherical(e2, Math.acos(1 - 2 * Math.random()), 2 * Math.random() * Math.PI));
    var Tr = M.forwardRef(({ radius: e2 = 100, depth: t2 = 50, count: r2 = 5e3, saturation: a2 = 0, factor: i2 = 4, fade: s2 = false, speed: c2 = 1 }, l2) => {
      const u2 = M.useRef(), [d2, m2, f2] = M.useMemo(() => {
        const o2 = [], s3 = [], c3 = Array.from({ length: r2 }, () => (0.5 + 0.5 * Math.random()) * i2), l3 = new n.Color();
        let u3 = e2 + t2;
        const d3 = t2 / r2;
        for (let e3 = 0; e3 < r2; e3++)
          u3 -= d3 * Math.random(), o2.push(...Sr(u3).toArray()), l3.setHSL(e3 / r2, a2, 0.9), s3.push(l3.r, l3.g, l3.b);
        return [new Float32Array(o2), new Float32Array(s3), new Float32Array(c3)];
      }, [r2, t2, i2, e2, a2]);
      o.useFrame((e3) => u2.current && (u2.current.uniforms.time.value = e3.clock.getElapsedTime() * c2));
      const [p2] = M.useState(() => new Mr());
      return M.createElement("points", { ref: l2 }, M.createElement("bufferGeometry", null, M.createElement("bufferAttribute", { attach: "attributes-position", args: [d2, 3] }), M.createElement("bufferAttribute", { attach: "attributes-color", args: [m2, 3] }), M.createElement("bufferAttribute", { attach: "attributes-size", args: [f2, 1] })), M.createElement("primitive", { ref: u2, object: p2, attach: "material", blending: n.AdditiveBlending, "uniforms-fade-value": s2, transparent: true, vertexColors: true }));
    });
    var Pr = de({ time: 0, pixelRatio: 1 }, "#define GLSLIFY 1\nuniform float pixelRatio;uniform float time;attribute float size;attribute float speed;attribute float opacity;attribute vec3 noise;attribute vec3 color;varying vec3 vColor;varying float vOpacity;void main(){vec4 modelPosition=modelMatrix*vec4(position,1.0);modelPosition.y+=sin(time*speed+modelPosition.x*noise.x*100.0)*0.2;modelPosition.z+=cos(time*speed+modelPosition.x*noise.y*100.0)*0.2;modelPosition.x+=cos(time*speed+modelPosition.x*noise.z*100.0)*0.2;vec4 viewPosition=viewMatrix*modelPosition;vec4 projectionPostion=projectionMatrix*viewPosition;gl_Position=projectionPostion;gl_PointSize=size*25.*pixelRatio;gl_PointSize*=(1.0/-viewPosition.z);vColor=color;vOpacity=opacity;}", "#define GLSLIFY 1\nvarying vec3 vColor;varying float vOpacity;void main(){float distanceToCenter=distance(gl_PointCoord,vec2(0.5));float strength=0.05/distanceToCenter-0.1;gl_FragColor=vec4(vColor,strength*vOpacity);}");
    var Cr = (e2) => e2 && e2.constructor === Float32Array;
    var Rr = (e2) => e2 instanceof T.Vector2 || e2 instanceof T.Vector3 || e2 instanceof T.Vector4;
    var _r = (e2) => Array.isArray(e2) ? e2 : Rr(e2) ? e2.toArray() : [e2, e2, e2];
    function Lr(e2, t2, r2) {
      return M.useMemo(() => {
        if (t2 !== void 0) {
          if (Cr(t2))
            return t2;
          if (t2 instanceof T.Color) {
            const r3 = Array.from({ length: 3 * e2 }, () => ((e3) => [e3.r, e3.g, e3.b])(t2)).flat();
            return Float32Array.from(r3);
          }
          if (Rr(t2) || Array.isArray(t2)) {
            const r3 = Array.from({ length: 3 * e2 }, () => _r(t2)).flat();
            return Float32Array.from(r3);
          }
          return Float32Array.from({ length: e2 }, () => t2);
        }
        return Float32Array.from({ length: e2 }, r2);
      }, [t2]);
    }
    var Dr = M.forwardRef((_a, l2) => {
      var _b = _a, { noise: e2 = 1, count: t2 = 100, speed: r2 = 1, opacity: n2 = 1, scale: a2 = 1, size: i2, color: s2 } = _b, c2 = __objRest(_b, ["noise", "count", "speed", "opacity", "scale", "size", "color"]);
      M.useMemo(() => o.extend({ SparklesMaterial: Pr }), []);
      const u2 = M.useRef(), d2 = o.useThree((e3) => e3.viewport.dpr), m2 = M.useMemo(() => Float32Array.from(Array.from({ length: t2 }, () => _r(a2).map(T.MathUtils.randFloatSpread)).flat()), [t2, a2]), f2 = Lr(t2, i2, Math.random), p2 = Lr(t2, n2), h2 = Lr(t2, r2), v2 = Lr(3 * t2, e2), g2 = Lr(s2 === void 0 ? 3 * t2 : t2, Cr(s2) ? s2 : new T.Color(s2), () => 1);
      return o.useFrame((e3) => u2.current.uniforms.time.value = e3.clock.elapsedTime), M.createElement("points", b.default({ key: `particle-${t2}-${JSON.stringify(a2)}` }, c2, { ref: l2 }), M.createElement("bufferGeometry", null, M.createElement("bufferAttribute", { attach: "attributes-position", args: [m2, 3] }), M.createElement("bufferAttribute", { attach: "attributes-size", args: [f2, 1] }), M.createElement("bufferAttribute", { attach: "attributes-opacity", args: [p2, 1] }), M.createElement("bufferAttribute", { attach: "attributes-speed", args: [h2, 1] }), M.createElement("bufferAttribute", { attach: "attributes-color", args: [g2, 3] }), M.createElement("bufferAttribute", { attach: "attributes-noise", args: [v2, 3] })), M.createElement("sparklesMaterial", { ref: u2, transparent: true, pixelRatio: d2, depthWrite: false }));
    });
    var zr = new T.Matrix4();
    var Ar = new T.Matrix4();
    var Fr = [];
    var Br = new T.Mesh();
    var kr = class extends T.Group {
      constructor() {
        super(), this.color = new T.Color("white"), this.instance = { current: void 0 }, this.instanceKey = { current: void 0 };
      }
      get geometry() {
        var e2;
        return (e2 = this.instance.current) == null ? void 0 : e2.geometry;
      }
      raycast(e2, t2) {
        const r2 = this.instance.current;
        if (!r2)
          return;
        if (!r2.geometry || !r2.material)
          return;
        Br.geometry = r2.geometry;
        const n2 = r2.matrixWorld;
        let o2 = r2.userData.instances.indexOf(this.instanceKey);
        if (!(o2 === -1 || o2 > r2.count)) {
          r2.getMatrixAt(o2, zr), Ar.multiplyMatrices(n2, zr), Br.matrixWorld = Ar, Br.raycast(e2, Fr);
          for (let e3 = 0, r3 = Fr.length; e3 < r3; e3++) {
            const r4 = Fr[e3];
            r4.instanceId = o2, r4.object = this, t2.push(r4);
          }
          Fr.length = 0;
        }
      }
    };
    var Ur;
    var jr;
    var Vr = M.createContext(null);
    var Or = new T.Matrix4();
    var Ir = new T.Vector3();
    new T.Color();
    var Wr = M.forwardRef((_a, a2) => {
      var _b = _a, { children: e2, range: t2, limit: r2 = 1e3 } = _b, n2 = __objRest(_b, ["children", "range", "limit"]);
      const i2 = M.useRef(null), [s2, c2] = M.useState([]), [[l2, u2, d2]] = M.useState(() => [new Float32Array(3 * r2), Float32Array.from({ length: 3 * r2 }, () => 1), Float32Array.from({ length: r2 }, () => 1)]);
      M.useEffect(() => {
        i2.current.geometry.attributes.position.needsUpdate = true;
      }), o.useFrame(() => {
        for (i2.current.updateMatrix(), i2.current.updateMatrixWorld(), Or.copy(i2.current.matrixWorld).invert(), i2.current.geometry.drawRange.count = Math.min(r2, t2 !== void 0 ? t2 : r2, s2.length), Ur = 0; Ur < s2.length; Ur++)
          jr = s2[Ur].current, jr.getWorldPosition(Ir).applyMatrix4(Or), Ir.toArray(l2, 3 * Ur), i2.current.geometry.attributes.position.needsUpdate = true, jr.matrixWorldNeedsUpdate = true, jr.color.toArray(u2, 3 * Ur), i2.current.geometry.attributes.color.needsUpdate = true, d2.set([jr.size], Ur), i2.current.geometry.attributes.size.needsUpdate = true;
      });
      const m2 = M.useMemo(() => {
        const e3 = {};
        for (Ur = 0; Ur < s2.length; Ur++) {
          var t3;
          Object.assign(e3, (t3 = s2[Ur].current) == null ? void 0 : t3.__r3f.handlers);
        }
        return Object.keys(e3).reduce((e4, t4) => __spreadProps(__spreadValues({}, e4), { [t4]: (e5) => {
          var r3, n3, o2;
          const a3 = (r3 = s2[e5.index]) == null ? void 0 : r3.current;
          return a3 == null || (n3 = a3.__r3f) == null || (o2 = n3.handlers) == null ? void 0 : o2[t4](__spreadProps(__spreadValues({}, e5), { object: a3 }));
        } }), {});
      }, [e2, s2]), f2 = M.useMemo(() => ({ subscribe: (e3) => (c2((t3) => [...t3, e3]), () => c2((t3) => t3.filter((t4) => t4.current !== e3.current))) }), []);
      return M.createElement("points", b.default({ matrixAutoUpdate: false, ref: C.default([a2, i2]) }, m2, n2), M.createElement("bufferGeometry", null, M.createElement("bufferAttribute", { attach: "attributes-position", count: l2.length / 3, array: l2, itemSize: 3, usage: T.DynamicDrawUsage }), M.createElement("bufferAttribute", { attach: "attributes-color", count: u2.length / 3, array: u2, itemSize: 3, usage: T.DynamicDrawUsage }), M.createElement("bufferAttribute", { attach: "attributes-size", count: d2.length, array: d2, itemSize: 1, usage: T.DynamicDrawUsage })), M.createElement(Vr.Provider, { value: f2 }, e2));
    });
    var Nr = M.forwardRef((_a, r2) => {
      var _b = _a, { children: e2 } = _b, t2 = __objRest(_b, ["children"]);
      M.useMemo(() => o.extend({ Position: kr }), []);
      const n2 = M.useRef(), { subscribe: a2 } = M.useContext(Vr);
      return M.useLayoutEffect(() => a2(n2), []), M.createElement("position", b.default({ ref: C.default([r2, n2]) }, t2), e2);
    });
    var Gr = M.forwardRef((_a, s2) => {
      var _b = _a, { children: e2, positions: t2, colors: r2, sizes: n2, stride: a2 = 3 } = _b, i2 = __objRest(_b, ["children", "positions", "colors", "sizes", "stride"]);
      const c2 = M.useRef(null);
      return o.useFrame(() => {
        const e3 = c2.current.geometry.attributes;
        e3.position.needsUpdate = true, r2 && (e3.color.needsUpdate = true), n2 && (e3.size.needsUpdate = true);
      }), M.createElement("points", b.default({ ref: C.default([s2, c2]) }, i2), M.createElement("bufferGeometry", null, M.createElement("bufferAttribute", { attach: "attributes-position", count: t2.length / a2, array: t2, itemSize: a2, usage: T.DynamicDrawUsage }), r2 && M.createElement("bufferAttribute", { attach: "attributes-color", count: r2.length / a2, array: r2, itemSize: 3, usage: T.DynamicDrawUsage }), n2 && M.createElement("bufferAttribute", { attach: "attributes-size", count: n2.length / a2, array: n2, itemSize: 1, usage: T.DynamicDrawUsage })), e2);
    });
    var Hr = M.forwardRef((e2, t2) => e2.positions instanceof Float32Array ? M.createElement(Gr, b.default({}, e2, { ref: t2 })) : M.createElement(Wr, b.default({}, e2, { ref: t2 })));
    var $r;
    var qr;
    var Xr = M.createContext(null);
    var Yr = new T.Matrix4();
    var Zr = new T.Matrix4();
    var Kr = new T.Matrix4();
    new T.Color();
    var Jr = new T.Vector3();
    var Qr = new T.Quaternion();
    var en = new T.Vector3();
    var tn = M.forwardRef((_a, n2) => {
      var _b = _a, { context: e2, children: t2 } = _b, r2 = __objRest(_b, ["context", "children"]);
      M.useMemo(() => o.extend({ Position: kr }), []);
      const a2 = M.useRef(), { subscribe: i2, getParent: s2 } = M.useContext(e2 || Xr);
      return M.useLayoutEffect(() => i2(a2), []), M.createElement("position", b.default({ instance: s2(), instanceKey: a2, ref: C.default([n2, a2]) }, r2), t2);
    });
    var rn = M.forwardRef((_a, i2) => {
      var _b = _a, { children: e2, range: t2, limit: r2 = 1e3, frames: n2 = 1 / 0 } = _b, a2 = __objRest(_b, ["children", "range", "limit", "frames"]);
      const [{ context: s2, instance: c2 }] = M.useState(() => {
        const e3 = M.createContext(null);
        return { context: e3, instance: M.forwardRef((t3, r3) => M.createElement(tn, b.default({ context: e3 }, t3, { ref: r3 }))) };
      }), l2 = M.useRef(null), [u2, d2] = M.useState([]), [[m2, f2]] = M.useState(() => {
        const e3 = new Float32Array(16 * r2);
        for ($r = 0; $r < r2; $r++)
          Kr.identity().toArray(e3, 16 * $r);
        return [e3, new Float32Array([...new Array(3 * r2)].map(() => 1))];
      });
      M.useEffect(() => {
        l2.current.instanceMatrix.needsUpdate = true;
      });
      let p2 = 0, h2 = 0;
      o.useFrame(() => {
        if (n2 === 1 / 0 || p2 < n2) {
          for (l2.current.updateMatrix(), l2.current.updateMatrixWorld(), Yr.copy(l2.current.matrixWorld).invert(), h2 = Math.min(r2, t2 !== void 0 ? t2 : r2, u2.length), l2.current.count = h2, l2.current.instanceMatrix.updateRange.count = 16 * h2, l2.current.instanceColor.updateRange.count = 3 * h2, $r = 0; $r < u2.length; $r++)
            qr = u2[$r].current, qr.matrixWorld.decompose(Jr, Qr, en), Zr.compose(Jr, Qr, en).premultiply(Yr), Zr.toArray(m2, 16 * $r), l2.current.instanceMatrix.needsUpdate = true, qr.color.toArray(f2, 3 * $r), l2.current.instanceColor.needsUpdate = true;
          p2++;
        }
      });
      const v2 = M.useMemo(() => ({ getParent: () => l2, subscribe: (e3) => (d2((t3) => [...t3, e3]), () => d2((t3) => t3.filter((t4) => t4.current !== e3.current))) }), []);
      return M.createElement("instancedMesh", b.default({ userData: { instances: u2 }, matrixAutoUpdate: false, ref: C.default([i2, l2]), args: [null, null, 0], raycast: () => null }, a2), M.createElement("instancedBufferAttribute", { attach: "instanceMatrix", count: m2.length / 16, array: m2, itemSize: 16, usage: T.DynamicDrawUsage }), M.createElement("instancedBufferAttribute", { attach: "instanceColor", count: f2.length / 3, array: f2, itemSize: 3, usage: T.DynamicDrawUsage }), typeof e2 == "function" ? M.createElement(s2.Provider, { value: v2 }, e2(c2)) : M.createElement(Xr.Provider, { value: v2 }, e2));
    });
    var nn = M.createContext(null);
    var on = M.forwardRef((e2, t2) => {
      M.useMemo(() => o.extend({ SegmentObject: an }), []);
      const _a = e2, { limit: r2 = 1e3, lineWidth: n2 = 1, children: a2 } = _a, i2 = __objRest(_a, ["limit", "lineWidth", "children"]), [s2, c2] = M.useState([]), [u2] = M.useState(() => new l.Line2()), [d2] = M.useState(() => new l.LineMaterial()), [m2] = M.useState(() => new l.LineSegmentsGeometry()), [f2] = M.useState(() => new T.Vector2(512, 512)), [p2] = M.useState(() => Array(6 * r2).fill(0)), [h2] = M.useState(() => Array(6 * r2).fill(0)), v2 = M.useMemo(() => ({ subscribe: (e3) => (c2((t3) => [...t3, e3]), () => c2((t3) => t3.filter((t4) => t4.current !== e3.current))) }), []);
      return o.useFrame(() => {
        for (let t3 = 0; t3 < r2; t3++) {
          var e3;
          const r3 = (e3 = s2[t3]) == null ? void 0 : e3.current;
          r3 && (p2[6 * t3 + 0] = r3.start.x, p2[6 * t3 + 1] = r3.start.y, p2[6 * t3 + 2] = r3.start.z, p2[6 * t3 + 3] = r3.end.x, p2[6 * t3 + 4] = r3.end.y, p2[6 * t3 + 5] = r3.end.z, h2[6 * t3 + 0] = r3.color.r, h2[6 * t3 + 1] = r3.color.g, h2[6 * t3 + 2] = r3.color.b, h2[6 * t3 + 3] = r3.color.r, h2[6 * t3 + 4] = r3.color.g, h2[6 * t3 + 5] = r3.color.b);
        }
        m2.setColors(h2), m2.setPositions(p2), u2.computeLineDistances();
      }), M.createElement("primitive", { object: u2, ref: t2 }, M.createElement("primitive", { object: m2, attach: "geometry" }), M.createElement("primitive", b.default({ object: d2, attach: "material", vertexColors: true, resolution: f2, linewidth: n2 }, i2)), M.createElement(nn.Provider, { value: v2 }, a2));
    });
    var an = class {
      constructor() {
        this.color = new T.Color("white"), this.start = new T.Vector3(0, 0, 0), this.end = new T.Vector3(0, 0, 0);
      }
    };
    var sn = (e2) => e2 instanceof T.Vector3 ? e2 : new T.Vector3(...typeof e2 == "number" ? [e2, e2, e2] : e2);
    var cn = M.forwardRef(({ color: e2, start: t2, end: r2 }, n2) => {
      const o2 = M.useContext(nn);
      if (!o2)
        throw "Segment must used inside Segments component.";
      const a2 = M.useRef(null);
      return M.useLayoutEffect(() => o2.subscribe(a2), []), M.createElement("segmentObject", { ref: C.default([a2, n2]), color: e2, start: sn(t2), end: sn(r2) });
    });
    var ln = M.forwardRef((_a, n2) => {
      var _b = _a, { children: e2, distances: t2 } = _b, r2 = __objRest(_b, ["children", "distances"]);
      const a2 = M.useRef(null);
      return M.useLayoutEffect(() => {
        const { current: e3 } = a2;
        e3.levels.length = 0, e3.children.forEach((r3, n3) => e3.levels.push({ object: r3, distance: t2[n3] }));
      }), o.useFrame((e3) => {
        var t3;
        return (t3 = a2.current) == null ? void 0 : t3.update(e3.camera);
      }), M.createElement("lOD", b.default({ ref: C.default([a2, n2]) }, r2), e2);
    });
    var un = new n.Matrix4();
    var dn = new n.Ray();
    var mn = new n.Sphere();
    var fn = new n.Vector3();
    var pn = M.forwardRef((_a, c2) => {
      var _b = _a, { children: e2, width: t2, height: r2, renderPriority: n2 = 0, eventPriority: a2 = 0, frames: i2 = 1 / 0 } = _b, s2 = __objRest(_b, ["children", "width", "height", "renderPriority", "eventPriority", "frames"]);
      const { size: l2, viewport: u2 } = o.useThree(), d2 = ht((t2 || l2.width) * u2.dpr, (r2 || l2.height) * u2.dpr, { samples: 8 }), [m2] = M.useState(() => new T.Scene()), f2 = M.useCallback((e3, t3, r3) => {
        var n3, o2;
        let a3 = (n3 = d2.texture) == null ? void 0 : n3.__r3f.parent;
        for (; a3 && !(a3 instanceof T.Object3D); )
          a3 = a3.__r3f.parent;
        if (!a3)
          return false;
        r3.raycaster.camera || r3.events.compute(e3, r3, (o2 = r3.previousRoot) == null ? void 0 : o2.getState());
        const [i3] = r3.raycaster.intersectObject(a3);
        if (!i3)
          return false;
        const s3 = i3.uv;
        t3.raycaster.setFromCamera(t3.pointer.set(2 * s3.x - 1, 2 * s3.y - 1), t3.camera);
      }, []);
      return M.useImperativeHandle(c2, () => d2.texture, [d2]), M.createElement(M.Fragment, null, o.createPortal(M.createElement(hn, { renderPriority: n2, frames: i2, fbo: d2 }, e2), m2, { events: { compute: f2, priority: a2 } }), M.createElement("primitive", b.default({ object: d2.texture }, s2)));
    });
    function hn({ frames: e2, renderPriority: t2, children: r2, fbo: n2 }) {
      let a2 = 0;
      return o.useFrame((t3) => {
        (e2 === 1 / 0 || a2 < e2) && (t3.gl.setRenderTarget(n2), t3.gl.render(t3.scene, t3.camera), t3.gl.setRenderTarget(null), a2++);
      }, t2), M.createElement(M.Fragment, null, r2);
    }
    var vn = new T.Color();
    function gn({ canvasSize: e2, scene: t2, index: r2, children: n2, frames: a2, rect: i2, track: s2 }) {
      const c2 = o.useThree((e3) => e3.get), l2 = o.useThree((e3) => e3.camera), u2 = o.useThree((e3) => e3.scene), d2 = o.useThree((e3) => e3.setEvents);
      let m2 = 0;
      return o.useFrame((r3) => {
        var o2, c3;
        (a2 === 1 / 0 || m2 <= a2) && (i2.current = (o2 = s2.current) == null ? void 0 : o2.getBoundingClientRect(), m2++);
        if (i2.current) {
          const { left: o3, right: a3, top: s3, bottom: d3, width: m3, height: f2 } = i2.current, p2 = d3 < 0 || s3 > e2.height || a3 < 0 || o3 > e2.width, h2 = e2.height - d3, v2 = m3 / f2;
          if ((c3 = l2) && c3.isOrthographicCamera ? l2.left === m3 / -2 && l2.right === m3 / 2 && l2.top === f2 / 2 && l2.bottom === f2 / -2 || (Object.assign(l2, { left: m3 / -2, right: m3 / 2, top: f2 / 2, bottom: f2 / -2 }), l2.updateProjectionMatrix()) : l2.aspect !== v2 && (l2.aspect = v2, l2.updateProjectionMatrix()), r3.gl.setViewport(o3, h2, m3, f2), r3.gl.setScissor(o3, h2, m3, f2), r3.gl.setScissorTest(true), p2)
            return r3.gl.getClearColor(vn), r3.gl.setClearColor(vn, r3.gl.getClearAlpha()), void r3.gl.clear(true, true);
          r3.gl.render(n2 ? u2 : t2, l2);
        }
      }, r2), M.useEffect(() => {
        const e3 = c2().events.connected;
        return d2({ connected: s2.current }), () => d2({ connected: e3 });
      }, []), M.createElement(M.Fragment, null, n2);
    }
    exports.AdaptiveDpr = function({ pixelated: e2 }) {
      const t2 = o.useThree((e3) => e3.gl), r2 = o.useThree((e3) => e3.internal.active), n2 = o.useThree((e3) => e3.performance.current), a2 = o.useThree((e3) => e3.viewport.initialDpr), i2 = o.useThree((e3) => e3.setDpr);
      return M.useEffect(() => {
        const n3 = t2.domElement;
        return () => {
          r2 && i2(a2), e2 && n3 && (n3.style.imageRendering = "auto");
        };
      }, []), M.useEffect(() => {
        i2(n2 * a2), e2 && t2.domElement && (t2.domElement.style.imageRendering = n2 === 1 ? "auto" : "pixelated");
      }, [n2]), null;
    }, exports.AdaptiveEvents = function() {
      const e2 = o.useThree((e3) => e3.get), t2 = o.useThree((e3) => e3.setEvents), r2 = o.useThree((e3) => e3.performance.current);
      return M.useEffect(() => {
        const r3 = e2().events.enabled;
        return () => t2({ enabled: r3 });
      }, []), M.useEffect(() => t2({ enabled: r2 === 1 }), [r2]), null;
    }, exports.ArcballControls = ze, exports.BBAnchor = (_a) => {
      var _b = _a, { anchor: e2 } = _b, t2 = __objRest(_b, ["anchor"]);
      const r2 = M.useRef(null), n2 = M.useRef(null);
      return M.useEffect(() => {
        var e3, t3;
        (e3 = r2.current) != null && (t3 = e3.parent) != null && t3.parent && (n2.current = r2.current.parent, r2.current.parent.parent.add(r2.current));
      }, []), o.useFrame(() => {
        n2.current && (vt.setFromObject(n2.current), vt.getSize(gt), r2.current.position.set(n2.current.position.x + gt.x * e2[0] / 2, n2.current.position.y + gt.y * e2[1] / 2, n2.current.position.z + gt.z * e2[2] / 2));
      }), M.createElement("group", b.default({ ref: r2 }, t2));
    }, exports.Backdrop = function(_c) {
      var _d = _c, { children: e2, floor: t2 = 0.25, segments: r2 = 20, receiveShadow: n2 } = _d, o2 = __objRest(_d, ["children", "floor", "segments", "receiveShadow"]);
      const a2 = M.useRef(null);
      return M.useLayoutEffect(() => {
        let e3 = 0;
        const n3 = r2 / r2 / 2, o3 = a2.current.attributes.position;
        for (let a3 = 0; a3 < r2 + 1; a3++)
          for (let i2 = 0; i2 < r2 + 1; i2++)
            o3.setXYZ(e3++, a3 / r2 - n3 + (a3 === 0 ? -t2 : 0), i2 / r2 - n3, pr(a3 / r2));
        o3.needsUpdate = true, a2.current.computeVertexNormals();
      }, [r2, t2]), M.createElement("group", o2, M.createElement("mesh", { receiveShadow: n2, rotation: [-Math.PI / 2, 0, Math.PI / 2] }, M.createElement("planeGeometry", { ref: a2, args: [1, 1, r2, r2] }), e2));
    }, exports.BakeShadows = function() {
      const e2 = o.useThree((e3) => e3.gl);
      return t.useEffect(() => (e2.shadowMap.autoUpdate = false, e2.shadowMap.needsUpdate = true, () => {
        e2.shadowMap.autoUpdate = e2.shadowMap.needsUpdate = true;
      }), [e2.shadowMap]), null;
    }, exports.Billboard = Q, exports.Bounds = function({ children: e2, damping: t2 = 6, fit: r2, clip: n2, observe: a2, margin: i2 = 1.2, eps: s2 = 0.01, onFit: c2 }) {
      const l2 = M.useRef(null), { camera: u2, invalidate: d2, size: m2, controls: f2 } = o.useThree(), p2 = f2, h2 = M.useRef(c2);
      function v2(e3, t3) {
        return Math.abs(e3.x - t3.x) < s2 && Math.abs(e3.y - t3.y) < s2 && Math.abs(e3.z - t3.z) < s2;
      }
      function g2(e3, t3, r3, n3) {
        e3.x = T.MathUtils.damp(e3.x, t3.x, r3, n3), e3.y = T.MathUtils.damp(e3.y, t3.y, r3, n3), e3.z = T.MathUtils.damp(e3.z, t3.z, r3, n3);
      }
      h2.current = c2;
      const [x2] = M.useState(() => ({ animating: false, focus: new T.Vector3(), camera: new T.Vector3(), zoom: 1 })), [y2] = M.useState(() => ({ focus: new T.Vector3(), camera: new T.Vector3(), zoom: 1 })), [E2] = M.useState(() => new T.Box3()), w2 = M.useMemo(() => {
        function e3() {
          const e4 = E2.getSize(new T.Vector3()), t3 = E2.getCenter(new T.Vector3()), r3 = Math.max(e4.x, e4.y, e4.z), n3 = er(u2) ? 4 * r3 : r3 / (2 * Math.atan(Math.PI * u2.fov / 360)), o2 = er(u2) ? 4 * r3 : n3 / u2.aspect, a3 = i2 * Math.max(n3, o2);
          return { box: E2, size: e4, center: t3, distance: a3 };
        }
        return { getSize: e3, refresh(t3) {
          if ((r3 = t3) && r3.isBox3)
            E2.copy(t3);
          else {
            const e4 = t3 || l2.current;
            e4.updateWorldMatrix(true, true), E2.setFromObject(e4);
          }
          var r3;
          if (E2.isEmpty()) {
            const e4 = u2.position.length() || 10;
            E2.setFromCenterAndSize(new T.Vector3(), new T.Vector3(e4, e4, e4));
          }
          if ((p2 == null ? void 0 : p2.constructor.name) === "OrthographicTrackballControls") {
            const { distance: t4 } = e3(), r4 = u2.position.clone().sub(p2.target).normalize().multiplyScalar(t4), n3 = p2.target.clone().add(r4);
            u2.position.copy(n3);
          }
          return this;
        }, clip() {
          const { distance: t3 } = e3();
          return p2 && (p2.maxDistance = 10 * t3), u2.near = t3 / 100, u2.far = 100 * t3, u2.updateProjectionMatrix(), p2 && p2.update(), d2(), this;
        }, fit() {
          x2.camera.copy(u2.position), p2 && x2.focus.copy(p2.target);
          const { center: r3, distance: n3 } = e3(), o2 = r3.clone().sub(u2.position).normalize().multiplyScalar(n3);
          if (y2.camera.copy(r3).sub(o2), y2.focus.copy(r3), er(u2)) {
            x2.zoom = u2.zoom;
            let e4 = 0, n4 = 0;
            const o3 = [new T.Vector3(E2.min.x, E2.min.y, E2.min.z), new T.Vector3(E2.min.x, E2.max.y, E2.min.z), new T.Vector3(E2.min.x, E2.min.y, E2.max.z), new T.Vector3(E2.min.x, E2.max.y, E2.max.z), new T.Vector3(E2.max.x, E2.max.y, E2.max.z), new T.Vector3(E2.max.x, E2.max.y, E2.min.z), new T.Vector3(E2.max.x, E2.min.y, E2.max.z), new T.Vector3(E2.max.x, E2.min.y, E2.min.z)];
            r3.applyMatrix4(u2.matrixWorldInverse);
            for (const t3 of o3)
              t3.applyMatrix4(u2.matrixWorldInverse), e4 = Math.max(e4, Math.abs(t3.y - r3.y)), n4 = Math.max(n4, Math.abs(t3.x - r3.x));
            e4 *= 2, n4 *= 2;
            const a3 = (u2.top - u2.bottom) / e4, s3 = (u2.right - u2.left) / n4;
            y2.zoom = Math.min(a3, s3) / i2, t2 || (u2.zoom = y2.zoom, u2.updateProjectionMatrix());
          }
          return t2 ? x2.animating = true : (u2.position.copy(y2.camera), u2.lookAt(y2.focus), p2 && (p2.target.copy(y2.focus), p2.update())), h2.current && h2.current(this.getSize()), d2(), this;
        } };
      }, [E2, u2, p2, i2, t2, d2]);
      M.useLayoutEffect(() => {
        if (p2) {
          const e3 = () => x2.animating = false;
          return p2.addEventListener("start", e3), () => p2.removeEventListener("start", e3);
        }
      }, [p2]);
      const b2 = M.useRef(0);
      return M.useLayoutEffect(() => {
        (a2 || b2.current++ == 0) && (w2.refresh(), r2 && w2.fit(), n2 && w2.clip());
      }, [m2, n2, r2, a2, u2, p2]), o.useFrame((e3, r3) => {
        if (x2.animating) {
          if (g2(x2.focus, y2.focus, t2, r3), g2(x2.camera, y2.camera, t2, r3), x2.zoom = T.MathUtils.damp(x2.zoom, y2.zoom, t2, r3), u2.position.copy(x2.camera), er(u2) && (u2.zoom = x2.zoom, u2.updateProjectionMatrix()), p2 ? (p2.target.copy(x2.focus), p2.update()) : u2.lookAt(x2.focus), d2(), er(u2) && !(Math.abs(x2.zoom - y2.zoom) < s2))
            return;
          if (!er(u2) && !v2(x2.camera, y2.camera))
            return;
          if (p2 && !v2(x2.focus, y2.focus))
            return;
          x2.animating = false;
        }
      }), M.createElement("group", { ref: l2 }, M.createElement(tr.Provider, { value: w2 }, e2));
    }, exports.Box = Dt, exports.CameraShake = rr, exports.Capsule = Xt, exports.Center = Qt, exports.Circle = zt, exports.Clone = Se, exports.Cloud = function(_e2) {
      var _f = _e2, { opacity: e2 = 0.5, speed: t2 = 0.4, width: r2 = 10, depth: n2 = 1.5, segments: a2 = 20, texture: i2 = "https://rawcdn.githack.com/pmndrs/drei-assets/9225a9f1fbd449d9411125c2f419b843d0308c9f/cloud.png", color: s2 = "#ffffff", depthTest: c2 = true } = _f, l2 = __objRest(_f, ["opacity", "speed", "width", "depth", "segments", "texture", "color", "depthTest"]);
      const u2 = o.useThree((e3) => e3.gl), d2 = M.useRef(), m2 = fe(i2), f2 = M.useMemo(() => [...new Array(a2)].map((e3, n3) => ({ x: r2 / 2 - Math.random() * r2, y: r2 / 2 - Math.random() * r2, scale: 0.4 + Math.sin((n3 + 1) / a2 * Math.PI) * (10 * (0.2 + Math.random())), density: Math.max(0.2, Math.random()), rotation: Math.max(2e-3, 5e-3 * Math.random()) * t2 })), [r2, a2, t2]);
      return o.useFrame((e3) => {
        var t3;
        return (t3 = d2.current) == null ? void 0 : t3.children.forEach((t4, r3) => {
          t4.children[0].rotation.z += f2[r3].rotation, t4.children[0].scale.setScalar(f2[r3].scale + (1 + Math.sin(e3.clock.getElapsedTime() / 10)) / 2 * r3 / 10);
        });
      }), M.createElement("group", l2, M.createElement("group", { position: [0, 0, a2 / 2 * n2], ref: d2 }, f2.map(({ x: t3, y: r3, scale: o2, density: a3 }, i3) => M.createElement(Q, { key: i3, position: [t3, r3, -i3 * n2] }, M.createElement(kt, { scale: o2, rotation: [0, 0, 0] }, M.createElement("meshStandardMaterial", { map: m2, "map-encoding": u2.outputEncoding, transparent: true, opacity: o2 / 6 * a3 * e2, depthTest: c2, color: s2 }))))));
    }, exports.ComputedAttribute = (_g) => {
      var _h = _g, { compute: e2, name: t2 } = _h, r2 = __objRest(_h, ["compute", "name"]);
      const [o2] = M.useState(() => new n.BufferAttribute(new Float32Array(0), 1)), a2 = M.useRef(null);
      return M.useLayoutEffect(() => {
        if (a2.current) {
          var t3;
          const r3 = (t3 = a2.current.parent) !== null && t3 !== void 0 ? t3 : a2.current.__r3f.parent, n2 = e2(r3);
          a2.current.copy(n2);
        }
      }, [e2]), M.createElement("primitive", b.default({ ref: a2, object: o2, attach: `attributes-${t2}` }, r2));
    }, exports.Cone = At, exports.ContactShadows = mr, exports.CubeCamera = function(_i) {
      var _j = _i, { children: e2, fog: t2, frames: r2 = 1 / 0, resolution: a2 = 256, near: i2 = 0.1, far: s2 = 1e3 } = _j, c2 = __objRest(_j, ["children", "fog", "frames", "resolution", "near", "far"]);
      const l2 = M.useRef(), [u2, d2] = M.useState(null), m2 = o.useThree(({ scene: e3 }) => e3), f2 = o.useThree(({ gl: e3 }) => e3), p2 = M.useMemo(() => {
        const e3 = new n.WebGLCubeRenderTarget(a2);
        return e3.texture.encoding = f2.outputEncoding, e3.texture.type = n.HalfFloatType, e3;
      }, [a2]);
      let h2 = 0;
      return o.useFrame(() => {
        if (u2 && l2.current && (r2 === 1 / 0 || h2 < r2)) {
          l2.current.traverse((e4) => e4.visible = false);
          const e3 = m2.fog;
          m2.fog = t2 || e3, u2.update(f2, m2), m2.fog = e3, l2.current.traverse((e4) => e4.visible = true), h2++;
        }
      }), M.createElement("group", c2, M.createElement("cubeCamera", { ref: d2, args: [i2, s2, p2] }), M.createElement("group", { ref: l2 }, e2(p2.texture)));
    }, exports.CubicBezierLine = ne, exports.CurveModifier = xt, exports.CycleRaycast = function({ onChanged: e2, portal: t2, preventDefault: r2 = true, scroll: n2 = true, keyCode: a2 = 9 }) {
      const i2 = M.useRef(0), s2 = o.useThree((e3) => e3.setEvents), c2 = o.useThree((e3) => e3.get), l2 = o.useThree((e3) => e3.gl);
      return M.useEffect(() => {
        var o2;
        let u2, d2 = [];
        const m2 = c2().events.filter, f2 = (o2 = t2 == null ? void 0 : t2.current) !== null && o2 !== void 0 ? o2 : l2.domElement.parentNode, p2 = () => f2 && e2 && e2(d2, Math.round(i2.current) % d2.length);
        s2({ filter: (e3, t3) => {
          let r3 = [...e3];
          r3.length === d2.length && d2.every((e4) => r3.map((e5) => e5.object.uuid).includes(e4.object.uuid)) || (i2.current = 0, d2 = r3, p2()), m2 && (r3 = m2(r3, t3));
          for (let e4 = 0; e4 < Math.round(i2.current) % r3.length; e4++) {
            const e5 = r3.shift();
            r3 = [...r3, e5];
          }
          return r3;
        } });
        const h2 = (e3) => {
          var t3, r3;
          i2.current = e3(i2.current), (t3 = c2().events.handlers) == null || t3.onPointerCancel(void 0), (r3 = c2().events.handlers) == null || r3.onPointerMove(u2), p2();
        }, v2 = (e3) => {
          (e3.keyCode || e3.which === a2) && (r2 && e3.preventDefault(), d2.length > 1 && h2((e4) => e4 + 1));
        }, g2 = (e3) => {
          r2 && e3.preventDefault();
          let t3 = 0;
          e3 || (e3 = window.event), e3.wheelDelta ? t3 = e3.wheelDelta / 120 : e3.detail && (t3 = -e3.detail / 3), d2.length > 1 && h2((e4) => Math.abs(e4 - t3));
        }, x2 = (e3) => u2 = e3;
        return document.addEventListener("pointermove", x2, { passive: true }), n2 && document.addEventListener("wheel", g2), a2 !== void 0 && document.addEventListener("keydown", v2), () => {
          s2({ filter: m2 }), a2 !== void 0 && document.removeEventListener("keydown", v2), n2 && document.removeEventListener("wheel", g2), document.removeEventListener("pointermove", x2);
        };
      }, [l2, c2, s2, r2, n2, a2]), null;
    }, exports.Cylinder = Ft, exports.Detailed = ln, exports.DeviceOrientationControls = Ce, exports.Dodecahedron = Ht, exports.Edges = function(_k) {
      var _l = _k, { userData: e2, children: t2, geometry: r2, threshold: n2 = 15, color: o2 = "black" } = _l, a2 = __objRest(_l, ["userData", "children", "geometry", "threshold", "color"]);
      const i2 = M.useRef(null);
      return M.useLayoutEffect(() => {
        const e3 = i2.current.parent;
        if (e3) {
          const t3 = r2 || e3.geometry;
          t3 === i2.current.userData.currentGeom && n2 === i2.current.userData.currentThreshold || (i2.current.userData.currentGeom = t3, i2.current.userData.currentThreshold = n2, i2.current.geometry = new T.EdgesGeometry(t3, n2));
        }
      }), M.createElement("lineSegments", b.default({ ref: i2, raycast: () => null }, a2), t2 || M.createElement("lineBasicMaterial", { color: o2 }));
    }, exports.Effects = ue, exports.Environment = dr, exports.EnvironmentCube = cr, exports.EnvironmentMap = ir, exports.EnvironmentPortal = lr, exports.Extrude = $t, exports.FirstPersonControls = Be, exports.Float = nr, exports.FlyControls = Re, exports.GizmoHelper = ({ alignment: e2 = "bottom-right", margin: t2 = [80, 80], renderPriority: r2 = 0, autoClear: a2 = true, onUpdate: i2, onTarget: s2, children: c2 }) => {
      const l2 = o.useThree(({ size: e3 }) => e3), u2 = o.useThree(({ camera: e3 }) => e3), d2 = o.useThree(({ controls: e3 }) => e3), m2 = o.useThree(({ gl: e3 }) => e3), f2 = o.useThree(({ scene: e3 }) => e3), p2 = o.useThree(({ invalidate: e3 }) => e3), h2 = M.useRef(), v2 = M.useRef(), g2 = M.useRef(null), [x2] = M.useState(() => new n.Scene()), y2 = M.useRef(false), E2 = M.useRef(0), w2 = M.useRef(new n.Vector3(0, 0, 0)), b2 = M.useCallback((e3) => {
        y2.current = true, (d2 || s2) && (w2.current = (d2 == null ? void 0 : d2.target) || (s2 == null ? void 0 : s2())), E2.current = u2.position.distanceTo(Ge), We.copy(u2.quaternion), He.copy(e3).multiplyScalar(E2.current).add(Ge), Oe.lookAt(He), Ne.copy(Oe.quaternion), p2();
      }, [d2, u2, s2, p2]);
      M.useEffect(() => (f2.background && (h2.current = f2.background, f2.background = null, x2.background = h2.current), () => {
        h2.current && (f2.background = h2.current);
      }), []), o.useFrame((e3, t3) => {
        if (g2.current && v2.current) {
          var r3;
          if (y2.current)
            if (We.angleTo(Ne) < 0.01)
              y2.current = false;
            else {
              const e4 = t3 * Ve;
              We.rotateTowards(Ne, e4), u2.position.set(0, 0, 1).applyQuaternion(We).multiplyScalar(E2.current).add(w2.current), u2.up.set(0, 1, 0).applyQuaternion(We).normalize(), u2.quaternion.copy(We), i2 ? i2() : d2 && d2.update(), p2();
            }
          Ie.copy(u2.matrix).invert(), (r3 = v2.current) == null || r3.quaternion.setFromRotationMatrix(Ie), a2 && (m2.autoClear = false), m2.clearDepth(), m2.render(x2, g2.current);
        }
      }, r2);
      const S2 = ke(g2), T2 = M.useMemo(() => ({ tweenCamera: b2, raycast: S2 }), [b2]), [P2, C2] = t2, R2 = e2.endsWith("-left") ? -l2.width / 2 + P2 : l2.width / 2 - P2, _2 = e2.startsWith("top-") ? l2.height / 2 - C2 : -l2.height / 2 + C2;
      return o.createPortal(M.createElement(Ue.Provider, { value: T2 }, M.createElement(Te, { ref: g2, position: [0, 0, 200] }), M.createElement("group", { ref: v2, position: [R2, _2, 0] }, c2)), x2);
    }, exports.GizmoViewcube = (e2) => M.createElement("group", { scale: [60, 60, 60] }, M.createElement(nt, e2), et.map((t2, r2) => M.createElement(ot, b.default({ key: r2, position: t2, dimensions: tt[r2] }, e2))), Je.map((t2, r2) => M.createElement(ot, b.default({ key: r2, position: t2, dimensions: Qe }, e2))), M.createElement("ambientLight", { intensity: 0.5 }), M.createElement("pointLight", { position: [10, 10, 10], intensity: 0.5 })), exports.GizmoViewport = (_m) => {
      var _n = _m, { hideNegativeAxes: e2, hideAxisHeads: t2, disabled: r2, font: n2 = "18px Inter var, Arial, sans-serif", axisColors: o2 = ["#ff3653", "#0adb50", "#2c8fdf"], axisHeadScale: a2 = 1, axisScale: i2, labels: s2 = ["X", "Y", "Z"], labelColor: c2 = "#000", onClick: l2 } = _n, u2 = __objRest(_n, ["hideNegativeAxes", "hideAxisHeads", "disabled", "font", "axisColors", "axisHeadScale", "axisScale", "labels", "labelColor", "onClick"]);
      const [d2, m2, f2] = o2, { tweenCamera: p2, raycast: h2 } = je(), v2 = { font: n2, disabled: r2, labelColor: c2, raycast: h2, onClick: l2, axisHeadScale: a2, onPointerDown: r2 ? void 0 : (e3) => {
        p2(e3.object.position), e3.stopPropagation();
      } };
      return M.createElement("group", b.default({ scale: 40 }, u2), M.createElement(at, { color: d2, rotation: [0, 0, 0], scale: i2 }), M.createElement(at, { color: m2, rotation: [0, 0, Math.PI / 2], scale: i2 }), M.createElement(at, { color: f2, rotation: [0, -Math.PI / 2, 0], scale: i2 }), !t2 && M.createElement(M.Fragment, null, M.createElement(it, b.default({ arcStyle: d2, position: [1, 0, 0], label: s2[0] }, v2)), M.createElement(it, b.default({ arcStyle: m2, position: [0, 1, 0], label: s2[1] }, v2)), M.createElement(it, b.default({ arcStyle: f2, position: [0, 0, 1], label: s2[2] }, v2)), !e2 && M.createElement(M.Fragment, null, M.createElement(it, b.default({ arcStyle: d2, position: [-1, 0, 0] }, v2)), M.createElement(it, b.default({ arcStyle: m2, position: [0, -1, 0] }, v2)), M.createElement(it, b.default({ arcStyle: f2, position: [0, 0, -1] }, v2)))), M.createElement("ambientLight", { intensity: 0.5 }), M.createElement("pointLight", { position: [10, 10, 10], intensity: 0.5 }));
    }, exports.GradientTexture = function(_o) {
      var _p = _o, { stops: e2, colors: t2, size: r2 = 1024 } = _p, n2 = __objRest(_p, ["stops", "colors", "size"]);
      const a2 = o.useThree((e3) => e3.gl), i2 = M.useMemo(() => {
        const n3 = document.createElement("canvas"), o2 = n3.getContext("2d");
        n3.width = 16, n3.height = r2;
        const a3 = o2.createLinearGradient(0, 0, 0, r2);
        let i3 = e2.length;
        for (; i3--; )
          a3.addColorStop(e2[i3], t2[i3]);
        o2.fillStyle = a3, o2.fillRect(0, 0, 16, r2);
        const s2 = new T.Texture(n3);
        return s2.needsUpdate = true, s2;
      }, [e2]);
      return M.useEffect(() => () => {
        i2.dispose();
      }, [i2]), M.createElement("primitive", b.default({ object: i2, attach: "map", encoding: a2.outputEncoding }, n2));
    }, exports.Html = W, exports.Icosahedron = Nt, exports.Image = xe, exports.Instance = tn, exports.Instances = rn, exports.IsObject = me, exports.Lathe = qt, exports.Lightformer = Er, exports.Line = ee, exports.Loader = function({ containerStyles: e2, innerStyles: t2, barStyles: r2, dataStyles: n2, dataInterpolation: o2 = H, initialState: a2 = (e3) => e3 }) {
      const { active: i2, progress: s2 } = G(), c2 = M.useRef(0), l2 = M.useRef(0), u2 = M.useRef(null), [d2, m2] = M.useState(a2(i2));
      M.useEffect(() => {
        let e3;
        return i2 !== d2 && (e3 = setTimeout(() => m2(i2), 300)), () => clearTimeout(e3);
      }, [d2, i2]);
      const f2 = M.useCallback(() => {
        u2.current && (c2.current += (s2 - c2.current) / 2, (c2.current > 0.95 * s2 || s2 === 100) && (c2.current = s2), u2.current.innerText = o2(c2.current), c2.current < s2 && (l2.current = requestAnimationFrame(f2)));
      }, [o2, s2]);
      return M.useEffect(() => (f2(), () => cancelAnimationFrame(l2.current)), [f2]), d2 ? M.createElement("div", { style: __spreadValues(__spreadProps(__spreadValues({}, $.container), { opacity: i2 ? 1 : 0 }), e2) }, M.createElement("div", null, M.createElement("div", { style: __spreadValues(__spreadValues({}, $.inner), t2) }, M.createElement("div", { style: __spreadValues(__spreadProps(__spreadValues({}, $.bar), { transform: `scaleX(${s2 / 100})` }), r2) }), M.createElement("span", { ref: u2, style: __spreadValues(__spreadValues({}, $.data), n2) })))) : null;
    }, exports.MapControls = _e, exports.Mask = function(_q) {
      var _r2 = _q, { id: e2 = 1, children: t2, colorWrite: r2 = false, depthWrite: n2 = false } = _r2, o2 = __objRest(_r2, ["id", "children", "colorWrite", "depthWrite"]);
      const a2 = M.useMemo(() => ({ colorWrite: r2, depthWrite: n2, stencilWrite: true, stencilRef: e2, stencilFunc: T.AlwaysStencilFunc, stencilFail: T.ReplaceStencilOp, stencilZFail: T.ReplaceStencilOp, stencilZPass: T.ReplaceStencilOp }), [e2, r2, n2]);
      return M.createElement("mesh", b.default({ renderOrder: -e2 }, o2), M.createElement("meshBasicMaterial", a2), typeof t2 == "function" ? t2(a2) : t2);
    }, exports.Merged = function(_s) {
      var _t2 = _s, { meshes: e2, children: t2 } = _t2, r2 = __objRest(_t2, ["meshes", "children"]);
      const n2 = Array.isArray(e2);
      if (!n2)
        for (const t3 of Object.keys(e2))
          e2[t3].isMesh || delete e2[t3];
      return M.createElement(z.default, { components: (n2 ? e2 : Object.values(e2)).map(({ geometry: e3, material: t3 }) => M.createElement(rn, b.default({ key: e3.uuid, geometry: e3, material: t3 }, r2))) }, (r3) => n2 ? t2(...r3) : t2(Object.keys(e2).filter((t3) => e2[t3].isMesh).reduce((e3, t3, n3) => __spreadProps(__spreadValues({}, e3), { [t3]: r3[n3] }), {})));
    }, exports.MeshDistortMaterial = Et, exports.MeshReflectorMaterial = Pt, exports.MeshWobbleMaterial = bt, exports.Octahedron = Gt, exports.OrbitControls = Le, exports.OrthographicCamera = Te, exports.PerspectiveCamera = Pe, exports.Plane = kt, exports.Point = Nr, exports.PointMaterial = Rt, exports.PointMaterialImpl = Ct, exports.PointerLockControls = Fe, exports.Points = Hr, exports.PointsBuffer = Gr, exports.Polyhedron = Wt, exports.PositionalAudio = oe, exports.Preload = function({ all: e2, scene: t2, camera: r2 }) {
      const a2 = o.useThree(({ gl: e3 }) => e3), i2 = o.useThree(({ camera: e3 }) => e3), s2 = o.useThree(({ scene: e3 }) => e3);
      return M.useLayoutEffect(() => {
        const o2 = [];
        e2 && (t2 || s2).traverse((e3) => {
          e3.visible === false && (o2.push(e3), e3.visible = true);
        }), a2.compile(t2 || s2, r2 || i2);
        const c2 = new n.WebGLCubeRenderTarget(128);
        new n.CubeCamera(0.01, 1e5, c2).update(a2, t2 || s2), c2.dispose(), o2.forEach((e3) => e3.visible = false);
      }, []), null;
    }, exports.PresentationControls = function({ snap: e2, global: t2, cursor: r2 = true, children: a2, speed: i2 = 1, rotation: l2 = [0, 0, 0], zoom: u2 = 1, polar: d2 = [0, Math.PI / 2], azimuth: m2 = [-1 / 0, 1 / 0], config: f2 = { mass: 1, tension: 170, friction: 26 } }) {
      const { size: p2, gl: h2 } = o.useThree(), v2 = M.useMemo(() => [l2[0] + d2[0], l2[0] + d2[1]], [l2[0], d2[0], d2[1]]), g2 = M.useMemo(() => [l2[1] + m2[0], l2[1] + m2[1]], [l2[1], m2[0], m2[1]]), x2 = M.useMemo(() => [n.MathUtils.clamp(l2[0], ...v2), n.MathUtils.clamp(l2[1], ...g2), l2[2]], [l2[0], l2[1], l2[2], v2, g2]), [y2, E2] = s.useSpring(() => ({ scale: 1, rotation: x2, config: f2 }));
      M.useEffect(() => {
        E2.start({ scale: 1, rotation: x2, config: f2 });
      }, [x2]), M.useEffect(() => {
        t2 && r2 && (h2.domElement.style.cursor = "grab");
      }, [t2, r2, h2.domElement]);
      const w2 = c.useGesture({ onHover: ({ last: e3 }) => {
        r2 && !t2 && (h2.domElement.style.cursor = e3 ? "auto" : "grab");
      }, onDrag: ({ down: t3, delta: [o2, a3], memo: [s2, c2] = y2.rotation.animation.to || x2 }) => {
        r2 && (h2.domElement.style.cursor = t3 ? "grabbing" : "grab"), o2 = n.MathUtils.clamp(c2 + o2 / p2.width * Math.PI * i2, ...g2), a3 = n.MathUtils.clamp(s2 + a3 / p2.height * Math.PI * i2, ...v2);
        const l3 = e2 && !t3 && typeof e2 != "boolean" ? e2 : f2;
        return E2.start({ scale: t3 && a3 > v2[1] / 2 ? u2 : 1, rotation: e2 && !t3 ? x2 : [a3, o2, 0], config: (e3) => e3 === "scale" ? __spreadProps(__spreadValues({}, l3), { friction: 3 * l3.friction }) : l3 }), [a3, o2];
      } }, { target: t2 ? h2.domElement : void 0 });
      return M.createElement(s.a.group, b.default({}, w2 == null ? void 0 : w2(), y2), a2);
    }, exports.QuadraticBezierLine = re, exports.Reflector = vr, exports.RenderTexture = pn, exports.Ring = It, exports.RoundedBox = Zt, exports.Sampler = (_u) => {
      var _v = _u, { children: e2, weight: t2, transform: r2, instances: o2, mesh: a2 } = _v, i2 = __objRest(_v, ["children", "weight", "transform", "instances", "mesh"]);
      const s2 = M.useRef(null), c2 = M.useRef(null), u2 = M.useRef(null);
      return M.useEffect(() => {
        var e3, t3;
        c2.current = (e3 = o2 == null ? void 0 : o2.current) !== null && e3 !== void 0 ? e3 : s2.current.children.find((e4) => e4.hasOwnProperty("instanceMatrix")), u2.current = (t3 = a2 == null ? void 0 : a2.current) !== null && t3 !== void 0 ? t3 : s2.current.children.find((e4) => e4.type === "Mesh");
      }, [e2, a2 == null ? void 0 : a2.current, o2 == null ? void 0 : o2.current]), M.useEffect(() => {
        if (u2.current === void 0)
          return;
        if (c2.current === void 0)
          return;
        const e3 = new l.MeshSurfaceSampler(u2.current);
        t2 && e3.setWeightAttribute(t2), e3.build();
        const o3 = new n.Vector3(), a3 = new n.Vector3(), i3 = new n.Color(), s3 = new n.Object3D();
        u2.current.updateMatrixWorld(true);
        for (let t3 = 0; t3 < c2.current.count; t3++)
          e3.sample(o3, a3, i3), typeof r2 == "function" ? r2({ dummy: s3, sampledMesh: u2.current, position: o3, normal: a3, color: i3 }, t3) : s3.position.copy(o3), s3.updateMatrix(), c2.current.setMatrixAt(t3, s3.matrix);
        c2.current.instanceMatrix.needsUpdate = true;
      }, [e2, a2 == null ? void 0 : a2.current, o2 == null ? void 0 : o2.current]), M.createElement("group", b.default({ ref: s2 }, i2), e2);
    }, exports.ScreenQuad = Jt, exports.Scroll = K, exports.ScrollControls = function({ eps: e2 = 1e-5, enabled: t2 = true, infinite: r2, horizontal: n2, pages: a2 = 1, distance: i2 = 1, damping: s2 = 4, style: c2 = {}, children: l2 }) {
      const { get: u2, setEvents: d2, gl: m2, size: f2, invalidate: p2, events: h2 } = o.useThree(), [v2] = M.useState(() => document.createElement("div")), [g2] = M.useState(() => document.createElement("div")), [x2] = M.useState(() => document.createElement("div")), y2 = m2.domElement.parentNode, E2 = M.useRef(0), w2 = M.useMemo(() => {
        const t3 = { el: v2, eps: e2, fill: g2, fixed: x2, horizontal: n2, damping: s2, offset: 0, delta: 0, scroll: E2, pages: a2, range(e3, t4, r3 = 0) {
          const n3 = e3 - r3, o2 = n3 + t4 + 2 * r3;
          return this.offset < n3 ? 0 : this.offset > o2 ? 1 : (this.offset - n3) / (o2 - n3);
        }, curve(e3, t4, r3 = 0) {
          return Math.sin(this.range(e3, t4, r3) * Math.PI);
        }, visible(e3, t4, r3 = 0) {
          const n3 = e3 - r3, o2 = n3 + t4 + 2 * r3;
          return this.offset >= n3 && this.offset <= o2;
        } };
        return t3;
      }, [e2, s2, n2, a2]);
      M.useEffect(() => {
        v2.style.position = "absolute", v2.style.width = "100%", v2.style.height = "100%", v2.style[n2 ? "overflowX" : "overflowY"] = "auto", v2.style[n2 ? "overflowY" : "overflowX"] = "hidden", v2.style.top = "0px", v2.style.left = "0px";
        for (const e4 in c2)
          v2.style[e4] = c2[e4];
        x2.style.position = "sticky", x2.style.top = "0px", x2.style.left = "0px", x2.style.width = "100%", x2.style.height = "100%", x2.style.overflow = "hidden", v2.appendChild(x2), g2.style.height = n2 ? "100%" : a2 * i2 * 100 + "%", g2.style.width = n2 ? a2 * i2 * 100 + "%" : "100%", g2.style.pointerEvents = "none", v2.appendChild(g2), y2.appendChild(v2), v2[n2 ? "scrollLeft" : "scrollTop"] = 1;
        const e3 = h2.connected || m2.domElement;
        requestAnimationFrame(() => h2.connect == null ? void 0 : h2.connect(v2));
        const t3 = u2().events.compute;
        return d2({ compute(e4, t4) {
          const r3 = e4.clientX - y2.offsetLeft, n3 = e4.clientY - y2.offsetTop;
          t4.pointer.set(r3 / t4.size.width * 2 - 1, -n3 / t4.size.height * 2 + 1), t4.raycaster.setFromCamera(t4.pointer, t4.camera);
        } }), () => {
          y2.removeChild(v2), d2({ compute: t3 }), h2.connect == null || h2.connect(e3);
        };
      }, [a2, i2, n2, v2, g2, x2, y2]), M.useEffect(() => {
        if (h2.connected === v2) {
          const e3 = f2[n2 ? "width" : "height"], o2 = v2[n2 ? "scrollWidth" : "scrollHeight"], a3 = o2 - e3;
          let i3 = 0, s3 = true, c3 = true;
          const l3 = () => {
            if (t2 && !c3 && (p2(), i3 = v2[n2 ? "scrollLeft" : "scrollTop"], E2.current = i3 / a3, r2)) {
              if (!s3) {
                if (i3 >= a3) {
                  const e4 = 1 - w2.offset;
                  v2[n2 ? "scrollLeft" : "scrollTop"] = 1, E2.current = w2.offset = -e4, s3 = true;
                } else if (i3 <= 0) {
                  const e4 = 1 + w2.offset;
                  v2[n2 ? "scrollLeft" : "scrollTop"] = o2, E2.current = w2.offset = e4, s3 = true;
                }
              }
              s3 && setTimeout(() => s3 = false, 40);
            }
          };
          v2.addEventListener("scroll", l3, { passive: true }), requestAnimationFrame(() => c3 = false);
          const u3 = (e4) => v2.scrollLeft += e4.deltaY / 2;
          return n2 && v2.addEventListener("wheel", u3, { passive: true }), () => {
            v2.removeEventListener("scroll", l3), n2 && v2.removeEventListener("wheel", u3);
          };
        }
      }, [v2, h2, f2, r2, w2, p2, n2, t2]);
      let b2 = 0;
      return o.useFrame((t3, r3) => {
        w2.offset = T.MathUtils.damp(b2 = w2.offset, E2.current, s2, r3), w2.delta = T.MathUtils.damp(w2.delta, Math.abs(b2 - w2.offset), s2, r3), w2.delta > e2 && p2();
      }), M.createElement(q.Provider, { value: w2 }, l2);
    }, exports.Segment = cn, exports.SegmentObject = an, exports.Segments = on, exports.Select = function(_w) {
      var _x = _w, { box: e2, multiple: t2, children: r2, onChange: n2, border: a2 = "1px solid #55aaff", backgroundColor: i2 = "rgba(75, 160, 255, 0.1)", filter: s2 = (e3) => e3 } = _x, c2 = __objRest(_x, ["box", "multiple", "children", "onChange", "border", "backgroundColor", "filter"]);
      const { setEvents: u2, camera: d2, raycaster: m2, gl: f2, controls: p2, size: h2, get: v2 } = o.useThree(), [g2, x2] = M.useState(false), [y2, E2] = M.useReducer((e3, { object: t3, shift: r3 }) => t3 === void 0 ? [] : Array.isArray(t3) ? t3 : r3 ? e3.includes(t3) ? e3.filter((e4) => e4 !== t3) : [t3, ...e3] : e3[0] === t3 ? [] : [t3], []);
      M.useEffect(() => {
        n2 == null || n2(y2);
      }, [y2]);
      const w2 = M.useCallback((e3) => {
        e3.stopPropagation(), E2({ object: s2([e3.object])[0], shift: t2 && e3.shiftKey });
      }, []), S2 = M.useCallback((e3) => !g2 && E2({}), [g2]), P2 = M.useRef(null);
      return M.useEffect(() => {
        if (!e2 || !t2)
          return;
        const r3 = new l.SelectionBox(d2, P2.current), n3 = document.createElement("div");
        n3.style.pointerEvents = "none", n3.style.border = a2, n3.style.backgroundColor = i2, n3.style.position = "fixed";
        const o2 = new T.Vector2(), c3 = new T.Vector2(), m3 = new T.Vector2(), g3 = v2().events.enabled, x3 = p2 == null ? void 0 : p2.enabled;
        let y3 = false;
        function w3(e3, t3) {
          const { offsetX: r4, offsetY: n4 } = e3, { width: o3, height: a3 } = h2;
          t3.set(r4 / o3 * 2 - 1, -n4 / a3 * 2 + 1);
        }
        function b2(e3) {
          e3.shiftKey && (!function(e4) {
            var t3;
            p2 && (p2.enabled = false), u2({ enabled: false }), y3 = true, (t3 = f2.domElement.parentElement) == null || t3.appendChild(n3), n3.style.left = `${e4.clientX}px`, n3.style.top = `${e4.clientY}px`, n3.style.width = "0px", n3.style.height = "0px", o2.x = e4.clientX, o2.y = e4.clientY;
          }(e3), w3(e3, r3.startPoint));
        }
        let M2 = [];
        function S3(e3) {
          if (y3) {
            !function(e4) {
              m3.x = Math.max(o2.x, e4.clientX), m3.y = Math.max(o2.y, e4.clientY), c3.x = Math.min(o2.x, e4.clientX), c3.y = Math.min(o2.y, e4.clientY), n3.style.left = `${c3.x}px`, n3.style.top = `${c3.y}px`, n3.style.width = m3.x - c3.x + "px", n3.style.height = m3.y - c3.y + "px";
            }(e3), w3(e3, r3.endPoint);
            const t3 = r3.select().sort((e4) => e4.uuid).filter((e4) => e4.isMesh);
            R.default(t3, M2) || (M2 = t3, E2({ object: s2(t3) }));
          }
        }
        function C2(e3) {
          var t3;
          y3 && y3 && (p2 && (p2.enabled = x3), u2({ enabled: g3 }), y3 = false, (t3 = n3.parentElement) == null || t3.removeChild(n3));
        }
        return document.addEventListener("pointerdown", b2, { passive: true }), document.addEventListener("pointermove", S3, { passive: true, capture: true }), document.addEventListener("pointerup", C2, { passive: true }), () => {
          document.removeEventListener("pointerdown", b2), document.removeEventListener("pointermove", S3), document.removeEventListener("pointerup", C2);
        };
      }, [h2, m2, d2, p2, f2]), M.createElement("group", b.default({ ref: P2, onClick: w2, onPointerOver: () => x2(true), onPointerOut: () => x2(false), onPointerMissed: S2 }, c2), M.createElement(J.Provider, { value: y2 }, r2));
    }, exports.Shadow = hr, exports.Sky = br, exports.Sparkles = Dr, exports.Sphere = Bt, exports.SpotLight = yr, exports.Stage = function(_y) {
      var _z = _y, { children: e2, controls: t2, shadows: r2 = true, adjustCamera: n2 = true, environment: a2 = "city", intensity: i2 = 1, preset: s2 = "rembrandt", shadowBias: c2 = 0, contactShadow: l2 = { blur: 2, opacity: 0.5, position: [0, 0, 0] } } = _z, u2 = __objRest(_z, ["children", "controls", "shadows", "adjustCamera", "environment", "intensity", "preset", "shadowBias", "contactShadow"]);
      const d2 = fr[s2], m2 = o.useThree((e3) => e3.camera), f2 = o.useThree((e3) => e3.controls), p2 = M.useRef(null), h2 = M.useRef(null), [{ radius: v2, width: g2, height: x2 }, y2] = M.useState({ radius: 0, width: 0, height: 0 });
      return M.useLayoutEffect(() => {
        p2.current.position.set(0, 0, 0), p2.current.updateWorldMatrix(true, true);
        const e3 = new T.Box3().setFromObject(h2.current), t3 = new T.Vector3(), r3 = new T.Sphere(), n3 = e3.max.y - e3.min.y, o2 = e3.max.x - e3.min.x;
        e3.getCenter(t3), e3.getBoundingSphere(r3), y2({ radius: r3.radius, width: o2, height: n3 }), p2.current.position.set(-t3.x, -t3.y + n3 / 2, -t3.z);
      }, [e2]), M.useLayoutEffect(() => {
        if (n2) {
          const e3 = v2 / (x2 > g2 ? 1.5 : 2.5);
          m2.position.set(0, 0.5 * v2, 2.5 * v2), m2.near = 0.1, m2.far = Math.max(5e3, 4 * v2), m2.lookAt(0, e3, 0);
          const r3 = f2 || (t2 == null ? void 0 : t2.current);
          r3 && (r3.target.set(0, e3, 0), r3.update());
        }
      }, [f2, v2, x2, g2, n2]), M.createElement("group", u2, M.createElement("group", { ref: p2 }, M.createElement("group", { ref: h2 }, e2)), l2 && M.createElement(mr, b.default({ scale: 2 * v2, far: v2 / 2 }, l2)), a2 && M.createElement(dr, { preset: a2 }), M.createElement("ambientLight", { intensity: i2 / 3 }), M.createElement("spotLight", { penumbra: 1, position: [d2.main[0] * v2, d2.main[1] * v2, d2.main[2] * v2], intensity: 2 * i2, castShadow: r2, "shadow-bias": c2 }), M.createElement("pointLight", { position: [d2.fill[0] * v2, d2.fill[1] * v2, d2.fill[2] * v2], intensity: i2 }));
    }, exports.Stars = Tr, exports.Stats = function({ showPanel: e2 = 0, className: t2, parent: r2 }) {
      const n2 = function(e3, t3 = [], r3) {
        const [n3, o2] = M.useState();
        return M.useLayoutEffect(() => {
          const t4 = e3();
          return o2(t4), pt(r3, t4), () => pt(r3, null);
        }, t3), n3;
      }(() => new D.default(), []);
      return M.useEffect(() => {
        if (n2) {
          const a2 = r2 && r2.current || document.body;
          n2.showPanel(e2), a2 == null || a2.appendChild(n2.dom), t2 && n2.dom.classList.add(...t2.split(" ").filter((e3) => e3));
          const i2 = o.addEffect(() => n2.begin()), s2 = o.addAfterEffect(() => n2.end());
          return () => {
            a2 == null || a2.removeChild(n2.dom), i2(), s2();
          };
        }
      }, [r2, n2, t2, e2]), null;
    }, exports.Tetrahedron = Ot, exports.Text = ae, exports.Text3D = le, exports.Torus = jt, exports.TorusKnot = Vt, exports.TrackballControls = De, exports.Trail = be, exports.TransformControls = Ae, exports.Tube = Ut, exports.View = ({ track: e2, index: t2 = 1, frames: r2 = 1 / 0, children: n2 }) => {
      const a2 = M.useRef(null), { size: i2, scene: s2 } = o.useThree(), [c2] = M.useState(() => new T.Scene()), l2 = M.useCallback((t3, r3) => {
        if (e2.current && t3.target === e2.current) {
          const { width: e3, height: n3, left: o2, top: i3 } = a2.current, s3 = t3.clientX - o2, c3 = t3.clientY - i3;
          r3.pointer.set(s3 / e3 * 2 - 1, -c3 / n3 * 2 + 1), r3.raycaster.setFromCamera(r3.pointer, r3.camera);
        }
      }, [a2]), [u2, d2] = M.useReducer(() => true, false);
      return M.useEffect(() => {
        var t3;
        a2.current = (t3 = e2.current) == null ? void 0 : t3.getBoundingClientRect(), d2();
      }, []), u2 && o.createPortal(M.createElement(gn, { canvasSize: i2, frames: r2, scene: s2, track: e2, rect: a2, index: t2 }, n2), c2, { events: { compute: l2, priority: t2 }, size: { width: a2.current.width, height: a2.current.height } });
    }, exports.calcPosFromAngles = wr, exports.isWebGL2Available = () => {
      try {
        var e2 = document.createElement("canvas");
        return !(!window.WebGL2RenderingContext || !e2.getContext("webgl2"));
      } catch (e3) {
        return false;
      }
    }, exports.meshBounds = function(e2, t2) {
      const r2 = this.geometry, n2 = this.material, o2 = this.matrixWorld;
      n2 !== void 0 && (r2.boundingSphere === null && r2.computeBoundingSphere(), mn.copy(r2.boundingSphere), mn.applyMatrix4(o2), e2.ray.intersectsSphere(mn) !== false && (un.copy(o2).invert(), dn.copy(e2.ray).applyMatrix4(un), r2.boundingBox !== null && dn.intersectBox(r2.boundingBox, fn) === null || t2.push({ distance: fn.distanceTo(e2.ray.origin), point: fn.clone(), object: this })));
    }, exports.shaderMaterial = de, exports.softShadows = (e2) => {
      if (!_t) {
        _t = true;
        let t2 = T.ShaderChunk.shadowmap_pars_fragment;
        t2 = t2.replace("#ifdef USE_SHADOWMAP", "#ifdef USE_SHADOWMAP\n" + (({ frustum: e3 = 3.75, size: t3 = 5e-3, near: r2 = 9.5, samples: n2 = 17, rings: o2 = 11 } = {}) => `#define LIGHT_WORLD_SIZE ${t3}
#define LIGHT_FRUSTUM_WIDTH ${e3}
#define LIGHT_SIZE_UV (LIGHT_WORLD_SIZE / LIGHT_FRUSTUM_WIDTH)
#define NEAR_PLANE ${r2}

#define NUM_SAMPLES ${n2}
#define NUM_RINGS ${o2}
#define BLOCKER_SEARCH_NUM_SAMPLES NUM_SAMPLES
#define PCF_NUM_SAMPLES NUM_SAMPLES

vec2 poissonDisk[NUM_SAMPLES];

void initPoissonSamples(const in vec2 randomSeed) {
  float ANGLE_STEP = PI2 * float(NUM_RINGS) / float(NUM_SAMPLES);
  float INV_NUM_SAMPLES = 1.0 / float(NUM_SAMPLES);
  float angle = rand(randomSeed) * PI2;
  float radius = INV_NUM_SAMPLES;
  float radiusStep = radius;
  for (int i = 0; i < NUM_SAMPLES; i++) {
    poissonDisk[i] = vec2(cos(angle), sin(angle)) * pow(radius, 0.75);
    radius += radiusStep;
    angle += ANGLE_STEP;
  }
}

float penumbraSize(const in float zReceiver, const in float zBlocker) { // Parallel plane estimation
  return (zReceiver - zBlocker) / zBlocker;
}

float findBlocker(sampler2D shadowMap, const in vec2 uv, const in float zReceiver) {
  float searchRadius = LIGHT_SIZE_UV * (zReceiver - NEAR_PLANE) / zReceiver;
  float blockerDepthSum = 0.0;
  int numBlockers = 0;
  for (int i = 0; i < BLOCKER_SEARCH_NUM_SAMPLES; i++) {
    float shadowMapDepth = unpackRGBAToDepth(texture2D(shadowMap, uv + poissonDisk[i] * searchRadius));
    if (shadowMapDepth < zReceiver) {
      blockerDepthSum += shadowMapDepth;
      numBlockers++;
    }
  }
  if (numBlockers == 0) return -1.0;
  return blockerDepthSum / float(numBlockers);
}

float PCF_Filter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius) {
  float sum = 0.0;
  for (int i = 0; i < PCF_NUM_SAMPLES; i++) {
    float depth = unpackRGBAToDepth(texture2D(shadowMap, uv + poissonDisk[ i ] * filterRadius));
    if (zReceiver <= depth) sum += 1.0;
  }
  for (int i = 0; i < PCF_NUM_SAMPLES; i++) {
    float depth = unpackRGBAToDepth(texture2D(shadowMap, uv + -poissonDisk[ i ].yx * filterRadius));
    if (zReceiver <= depth) sum += 1.0;
  }
  return sum / (2.0 * float(PCF_NUM_SAMPLES));
}

float PCSS(sampler2D shadowMap, vec4 coords) {
  vec2 uv = coords.xy;
  float zReceiver = coords.z; // Assumed to be eye-space z in this code
  initPoissonSamples(uv);
  float avgBlockerDepth = findBlocker(shadowMap, uv, zReceiver);
  if (avgBlockerDepth == -1.0) return 1.0;
  float penumbraRatio = penumbraSize(zReceiver, avgBlockerDepth);
  float filterRadius = penumbraRatio * LIGHT_SIZE_UV * NEAR_PLANE / zReceiver;
  return PCF_Filter(shadowMap, uv, zReceiver, filterRadius);
}`)(__spreadValues({}, e2))), t2 = t2.replace("#if defined( SHADOWMAP_TYPE_PCF )", "\nreturn PCSS(shadowMap, shadowCoord);\n#if defined( SHADOWMAP_TYPE_PCF )"), T.ShaderChunk.shadowmap_pars_fragment = t2;
      }
    }, exports.useAnimations = function(e2, t2) {
      const r2 = M.useRef(), [a2] = M.useState(() => t2 ? t2 instanceof n.Object3D ? { current: t2 } : t2 : r2), [i2] = M.useState(() => new n.AnimationMixer(void 0)), s2 = M.useRef({}), [c2] = M.useState(() => {
        const t3 = {};
        return e2.forEach((e3) => Object.defineProperty(t3, e3.name, { enumerable: true, get() {
          if (a2.current)
            return s2.current[e3.name] || (s2.current[e3.name] = i2.clipAction(e3, a2.current));
        } })), { ref: a2, clips: e2, actions: t3, names: e2.map((e3) => e3.name), mixer: i2 };
      });
      return o.useFrame((e3, t3) => i2.update(t3)), M.useEffect(() => {
        const e3 = a2.current;
        return () => {
          s2.current = {}, Object.values(c2.actions).forEach((t3) => {
            e3 && i2.uncacheAction(t3, e3);
          });
        };
      }, [e2]), c2;
    }, exports.useAspect = function(e2, t2, r2 = 1) {
      const n2 = o.useThree((e3) => e3.viewport), a2 = t2 * (n2.aspect > e2 / t2 ? n2.width / e2 : n2.height / t2);
      return [e2 * (n2.aspect > e2 / t2 ? n2.width / e2 : n2.height / t2) * r2, a2 * r2, 1];
    }, exports.useBVH = function(e2, t2) {
      M.useEffect(() => {
        if (e2.current) {
          e2.current.raycast = x.acceleratedRaycast;
          const r2 = e2.current.geometry;
          return r2.computeBoundsTree = x.computeBoundsTree, r2.disposeBoundsTree = x.disposeBoundsTree, r2.computeBoundsTree(t2), () => {
            r2.boundsTree && r2.disposeBoundsTree();
          };
        }
      }, [e2, t2]);
    }, exports.useBounds = function() {
      return M.useContext(tr);
    }, exports.useBoxProjectedEnv = function(e2 = new T.Vector3(), t2 = new T.Vector3()) {
      const [r2] = M.useState(() => ({ position: new T.Vector3(), size: new T.Vector3() }));
      o.applyProps(r2, { position: e2, size: t2 });
      const n2 = M.useRef(null), a2 = M.useMemo(() => ({ ref: n2, onBeforeCompile: (e3) => function(e4, t3, r3) {
        e4.defines.BOX_PROJECTED_ENV_MAP = true, e4.uniforms.envMapPosition = { value: t3 }, e4.uniforms.envMapSize = { value: r3 }, e4.vertexShader = `
  varying vec3 vWorldPosition;
  ${e4.vertexShader.replace("#include <worldpos_vertex>", "\n#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n  vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n  #ifdef BOX_PROJECTED_ENV_MAP\n    vWorldPosition = worldPosition.xyz;\n  #endif\n#endif\n")}`, e4.fragmentShader = `
    
#ifdef BOX_PROJECTED_ENV_MAP
  uniform vec3 envMapSize;
  uniform vec3 envMapPosition;
  varying vec3 vWorldPosition;
    
  vec3 parallaxCorrectNormal( vec3 v, vec3 cubeSize, vec3 cubePos ) {
    vec3 nDir = normalize( v );
    vec3 rbmax = ( .5 * cubeSize + cubePos - vWorldPosition ) / nDir;
    vec3 rbmin = ( -.5 * cubeSize + cubePos - vWorldPosition ) / nDir;
    vec3 rbminmax;
    rbminmax.x = ( nDir.x > 0. ) ? rbmax.x : rbmin.x;
    rbminmax.y = ( nDir.y > 0. ) ? rbmax.y : rbmin.y;
    rbminmax.z = ( nDir.z > 0. ) ? rbmax.z : rbmin.z;
    float correction = min( min( rbminmax.x, rbminmax.y ), rbminmax.z );
    vec3 boxIntersection = vWorldPosition + nDir * correction;    
    return boxIntersection - cubePos;
  }
#endif

    ${e4.fragmentShader.replace("#include <envmap_physical_pars_fragment>", T.ShaderChunk.envmap_physical_pars_fragment).replace("vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );", "vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n         \n#ifdef BOX_PROJECTED_ENV_MAP\n  worldNormal = parallaxCorrectNormal( worldNormal, envMapSize, envMapPosition );\n#endif\n\n         ").replace("reflectVec = inverseTransformDirection( reflectVec, viewMatrix );", "reflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n         \n#ifdef BOX_PROJECTED_ENV_MAP\n  reflectVec = parallaxCorrectNormal( reflectVec, envMapSize, envMapPosition );\n#endif\n\n        ")}`;
      }(e3, r2.position, r2.size), customProgramCacheKey: () => JSON.stringify(r2.position.toArray()) + JSON.stringify(r2.size.toArray()) }), [...r2.position.toArray(), ...r2.size.toArray()]);
      return M.useLayoutEffect(() => {
        n2.current.needsUpdate = true;
      }, [r2]), a2;
    }, exports.useCamera = ke, exports.useContextBridge = function(...e2) {
      const t2 = M.useRef([]);
      return t2.current = e2.map((e3) => M.useContext(e3)), M.useMemo(() => ({ children: r2 }) => e2.reduceRight((e3, r3, n2) => M.createElement(r3.Provider, { value: t2.current[n2], children: e3 }), r2), []);
    }, exports.useCubeTexture = st, exports.useCursor = function(e2, t2 = "pointer", r2 = "auto") {
      M.useEffect(() => {
        if (e2)
          return document.body.style.cursor = t2, () => {
            document.body.style.cursor = r2;
          };
      }, [e2]);
    }, exports.useDepthBuffer = function({ size: e2 = 256, frames: t2 = 1 / 0 } = {}) {
      const r2 = o.useThree((e3) => e3.viewport.dpr), { width: a2, height: i2 } = o.useThree((e3) => e3.size), s2 = e2 || a2 * r2, c2 = e2 || i2 * r2, l2 = M.useMemo(() => {
        const e3 = new n.DepthTexture(s2, c2);
        return e3.format = n.DepthFormat, e3.type = n.UnsignedShortType, { depthTexture: e3 };
      }, [s2, c2]);
      let u2 = 0;
      const d2 = ht(s2, c2, l2);
      return o.useFrame((e3) => {
        (t2 === 1 / 0 || u2 < t2) && (e3.gl.setRenderTarget(d2), e3.gl.render(e3.scene, e3.camera), e3.gl.setRenderTarget(null), u2++);
      }), d2.depthTexture;
    }, exports.useDetectGPU = (e2) => m.suspend(() => g.getGPUTier(e2), ["useDetectGPU"]), exports.useEnvironment = sr, exports.useFBO = ht, exports.useFBX = ct, exports.useGLTF = dt, exports.useGizmoContext = je, exports.useHelper = function(e2, t2, ...r2) {
      const n2 = M.useRef(), a2 = o.useThree((e3) => e3.scene);
      return M.useEffect(() => (e2 && t2 && e2 != null && e2.current && (n2.current = new t2(e2.current, ...r2), n2.current && a2.add(n2.current)), !e2 && n2.current && a2.remove(n2.current), () => {
        n2.current && a2.remove(n2.current);
      }), [a2, t2, e2, r2]), o.useFrame(() => {
        var e3;
        (e3 = n2.current) != null && e3.update && n2.current.update();
      }), n2;
    }, exports.useIntersect = function(e2) {
      const t2 = M.useRef(null), r2 = M.useRef(false), n2 = M.useRef(false);
      return M.useEffect(() => {
        const a2 = t2.current;
        if (a2) {
          const t3 = o.addEffect(() => (r2.current = false, true)), i2 = a2.onBeforeRender;
          a2.onBeforeRender = () => r2.current = true;
          const s2 = o.addAfterEffect(() => (r2.current !== n2.current && e2(n2.current = r2.current), true));
          return () => {
            a2.onBeforeRender = i2, t3(), s2();
          };
        }
      }, []), t2;
    }, exports.useKTX2 = ft, exports.useMask = function(e2, t2 = false) {
      return { stencilWrite: true, stencilRef: e2, stencilFunc: t2 ? T.NotEqualStencilFunc : T.EqualStencilFunc, stencilFail: T.KeepStencilOp, stencilZFail: T.KeepStencilOp, stencilZPass: T.KeepStencilOp };
    }, exports.useMatcapTexture = function(e2 = 0, t2 = 1024, r2) {
      const n2 = m.suspend(() => fetch("https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/matcaps.json").then((e3) => e3.json()), ["matcapList"]), o2 = n2[0], a2 = M.useMemo(() => Object.keys(n2).length, []), i2 = `${M.useMemo(() => typeof e2 == "string" ? e2 : typeof e2 == "number" ? n2[e2] : null, [e2]) || o2}${function(e3) {
        switch (e3) {
          case 64:
            return "-64px";
          case 128:
            return "-128px";
          case 256:
            return "-256px";
          case 512:
            return "-512px";
          default:
            return "";
        }
      }(t2)}.png`, s2 = `https://rawcdn.githack.com/emmelleppi/matcaps/9b36ccaaf0a24881a39062d05566c9e92be4aa0d/${t2}/${i2}`;
      return [fe(s2, r2), s2, a2];
    }, exports.useNormalTexture = function(e2 = 0, t2 = {}, r2) {
      const { repeat: o2 = [1, 1], anisotropy: a2 = 1, offset: i2 = [0, 0] } = t2, s2 = m.suspend(() => fetch("https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/normals/normals.json").then((e3) => e3.json()), ["normalsList"]), c2 = M.useMemo(() => Object.keys(s2).length, []), l2 = s2[0], u2 = `https://rawcdn.githack.com/pmndrs/drei-assets/7a3104997e1576f83472829815b00880d88b32fb/normals/${s2[e2] || l2}`, d2 = fe(u2, r2);
      return M.useLayoutEffect(() => {
        d2 && (d2.wrapS = d2.wrapT = n.RepeatWrapping, d2.repeat = new n.Vector2(o2[0], o2[1]), d2.offset = new n.Vector2(i2[0], i2[1]), d2.anisotropy = a2);
      }, [d2, a2, o2, i2]), [d2, u2, c2];
    }, exports.useProgress = G, exports.useScroll = X, exports.useSelect = function() {
      return M.useContext(J);
    }, exports.useTexture = fe, exports.useTrail = we;
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});
init_react();

// server-entry-module:@remix-run/dev/server-build
init_react();

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
init_react();
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/alex/code/tmp/remix-three-test/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  meta: () => meta
});
init_react();
var import_react2 = require("@remix-run/react");
var meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_react2.Outlet, null), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null)));
}

// route:/Users/alex/code/tmp/remix-three-test/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index
});
init_react();
var import_drei = __toESM(require_index_cjs());
var import_fiber = require("@react-three/fiber");
function Index() {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      fontFamily: "system-ui, sans-serif",
      lineHeight: "1.4",
      height: "100vh"
    }
  }, /* @__PURE__ */ React.createElement("h1", null, "Error reproduction of certain libraries not working if remix compile doesn't minify"), /* @__PURE__ */ React.createElement(import_fiber.Canvas, null, /* @__PURE__ */ React.createElement(import_drei.Box, null)));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
init_react();
var assets_manifest_default = { "version": "af0ad9fa", "entry": { "module": "/build/entry.client-4JEIEJGB.js", "imports": ["/build/_shared/chunk-BGTSCBIB.js", "/build/_shared/chunk-I3OSAN5C.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-G7SRJNH7.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-4QOHEFNM.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-AF0AD9FA.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map
