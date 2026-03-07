<template>
  <div class="not-found">
    <div class="container">
      <h1 class="code">404</h1>
      <p class="message">Oh！No！ 页面不存在</p>
      <p class="description">您访问的链接可能已损坏或页面已被移除。</p>
      <router-link to="/" class="home-link">
        <button class="btn">返回首页</button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, skyblue 100%);
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
}

.container {
  text-align: center;
  background: rgb(255 255 255 / 95%);
  padding: 3rem 4rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgb(0 0 0 / 10%);
  backdrop-filter: blur(10px);
  max-width: 600px;
  width: 100%;
}

.code {
  font-size: 8rem;
  font-weight: 700;
  margin: 0;
  line-height: 1;
  background: linear-gradient(135deg, #667eea, skyblue);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: float 3s ease-in-out infinite;
}

.message {
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0 0.5rem;
  color: #2d3748;
}

.description {
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn {
  display: inline-block;
  padding: 0.8rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(135deg, #667eea, skyblue);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 4px 15px rgb(102 126 234 / 40%);
  text-decoration: none;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgb(102 126 234 / 60%);
}

.btn:active {
  transform: translateY(-1px);
}

.home-link {
  text-decoration: none;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* 移动端适配 */
@media (width <= 480px) {
  .container {
    padding: 2rem 1.5rem;
  }

  .code {
    font-size: 6rem;
  }

  .message {
    font-size: 1.5rem;
  }

  .description {
    font-size: 1rem;
  }

  .btn {
    padding: 0.7rem 2rem;
    font-size: 1rem;
  }
}
</style>
