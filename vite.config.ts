import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      // GIF 이미지 최적화 설정
      gifsicle: {
        optimizationLevel: 7, // 최적화 레벨 (1-7, 높을수록 압축률 높음)
        interlaced: false, // 인터레이스 여부
      },
      // JPEG 이미지 최적화 설정 (mozjpeg 사용)
      mozjpeg: {
        quality: 75, // 품질 (0-100, 낮을수록 압축률 높고 품질 손실 큼)
      },
      // PNG 이미지 최적화 설정 (optipng 사용)
      optipng: {
        optimizationLevel: 7, // 최적화 레벨 (0-7, 높을수록 압축률 높음)
      },
      // SVG 이미지 최적화 설정 (svgo 사용)
      svgo: {
        plugins: [
          {
            name: 'removeViewBox', // viewBox 속성 제거 여부
            active: false,
          },
          {
            name: 'addAttributesToSVGElement', // SVG 요소에 속성 추가
            params: {
              attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
            },
          },
        ],
      },
      // WebP 이미지 최적화 설정 (WebP는 별도 변환이 필요할 수 있음)
      webp: {
        quality: 75, // 품질 (0-100)
      },
    }),
  ],
});
