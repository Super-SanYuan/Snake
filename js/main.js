// 食物构造函数
(function () {
  var map = document.querySelector('.map')
  var elements = [] // 食物数组
  // 随机坐标
  function Random (max, min) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  // 私有方法
  function removeFood () {
    for (var i = 0; i < elements.length; i++) {
      var ele = elements[i]
      ele.parentNode.removeChild(ele)
      elements.splice(i, 1)
    }
  }
  // 食物有宽高颜色坐标
  function Food (width, height, color, x, y) {
    this.width = width || 20
    this.height = height || 20
    this.color = color || 'green'
    this.x = x || 0
    this.y = y || 0
    this.ele = document.createElement('div')
  }
  Food.prototype.init = function () {
    removeFood() // 先删除
    this.ele.style.width = this.width + 'px'
    this.ele.style.height = this.height + 'px'
    this.ele.style.position = 'absolute'
    this.ele.style.backgroundColor = this.color
    map.appendChild(this.ele)
    elements.push(this.ele)
    this.random()
  }
  Food.prototype.random = function () {
    this.x = Random(map.offsetWidth / this.width, 0) * this.width + 'px'
    this.y = Random(map.offsetHeight / this.height, 0) * this.height + 'px'
    this.ele.style.left = this.x
    this.ele.style.top = this.y
  }

  window.Food = Food
}(window));


// 蛇
(function () {
  var elements = []
  function Snake (width, height, direction) {
    this.width = width || 20
    this.height = height || 20
    this.body = [
      { x: 3, y: 2, color: 'red' },
      { x: 2, y: 2, color: 'yellow' },
      { x: 1, y: 2, color: 'yellow' }
    ]
    this.direction = direction || 'right'
  }
  Snake.prototype.init = function (map) {
    for (var i = 0; i < this.body.length; i++) {
      var obj = this.body[i]
      var div = document.createElement('div')
      map.appendChild(div)
      div.style.position = 'absolute'
      div.style.width = this.width + 'px'
      div.style.height = this.height + 'px'
      div.style.left = obj.x * this.width + 'px'
      div.style.top = obj.y * this.height + 'px'
      div.style.backgroundColor = obj.color
      elements.push(div)
    }
  }

  window.Snake = Snake
}());

new Food().init()
new Snake().init(document.querySelector('.map'))