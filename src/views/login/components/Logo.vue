<template>
  <div class="header">
    <img class="header__logo" src="src/assets/logo.png" alt="logo" />
    <p class="header__title">Take-Out-Order</p>
  </div>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__logo {
    display: block;
    width: 75px;
    height: 75px;
    padding-top: 40px;
  }
  &__title {
    font-size: 18px;
    color: #000;
    font-weight: normal;
    padding-top: 15px;
  }
}
</style>
