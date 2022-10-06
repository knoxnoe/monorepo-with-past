<template>
  <div id="nologin">
    <div class="noe-nologin">
      <div class="logo">
        <span class="mainletter">H</span><span class="mainletter">e</span><span class="mainletter">l</span><span class="mainletter">l
      </span><span class="mainletter">o</span>&nbsp;
        <span class="mainletter">G</span><span class="mainletter">i</span><span class="mainletter">t</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoLogin",
  data() {
    return {
      title: "Hello Git"
    };
  },
  mounted() {
    let div = document.querySelectorAll('.mainletter');
    [...div].forEach( item => {
      item.addEventListener('mouseover', function() {
        this.classList.add('color')
      });

      item.addEventListener('animationend', function() {
        this.classList.remove('color')
      })
    })

  },
  methods: {
    open1() {
      const h = this.$createElement;

      this.$notify({
        title: '标题名称',
        message: h('i', {style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
      });
    }
  }
}
</script>

<style scoped>
.noe-nologin {
  width: 100%;
  height: 95vh;
  margin-top: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #34465e;
}
.logo {
  font-size: 9em;
  font-weight: bold;
  color: #9b59b6;
  cursor: pointer;
}
.logo > span{
  position: relative;
  display: inline-block;
}
.color {
  -webkit-animation-name: color;
  -moz-animation-name: color;
  -o-animation-name: color;
  animation-name: color;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: 2;
}

@keyframes color {
  50% {
    color: #f1c40f;
    transform: scale(2);
  }
  to {
    color: #e74c3c;
    transform: scale(0.5);
  }

}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.
{}
</style>