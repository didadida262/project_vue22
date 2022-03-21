import paper from 'paper'

const Boid = paper.Base.extend({
  // 初始化tadpole类
  // position: 随机的point类坐标
  // maxSpeed： 10
  // maxForce:  0.05
  initialize: function(position, maxSpeed, maxForce) {
    //   确定蝌蚪头部坐标，即在画布范围内随机生成的位置
    this.position = position.clone()

    // strength的取值范围:[0, 0.5)
    const strength = Math.random() * 0.5

    // 尾巴的点数,因为尾巴是一条直线，因此，需要各个点组成
    // 取值范围:[10, 15)
    this.amount = strength * 10 + 10

    this.acceleration = new paper.Point()
    this.vector = new paper.Point.random()
    this.radius = 30

    // 取值范围:[10, 10.5),干嘛的未知
    this.maxSpeed = maxSpeed + strength

    // 取值范围:[0.05, 0.55),干嘛的未知
    this.maxForce = maxForce + strength

    this.count = 0
    this.createItems()
  },
  createItems: function() {
    // 椭圆，代表蝌蚪的头部
    this.head = new paper.Shape.Ellipse({
    //   center: [0, 0],
      center: [this.position.x, this.position.y],
      size: [13, 8],
      fillColor: 'orange'
    })
    // 尾巴
    this.path = new paper.Path({
      strokeColor: 'green',
      strokeWidth: 2,
      strokeCap: 'round'
    })
    // 目测是尾巴长度
    for (let i = 0; i < this.amount; i++) {
      this.path.add(new paper.Point())
    }
    // 颈部
    this.shortPath = new paper.Path({
      strokeColor: 'white',
      strokeWidth: 4,
      strokeCap: 'round'
    })
    for (let i = 0; i < Math.min(3, this.amount); i++) { this.shortPath.add(new paper.Point()) }
  },
  run: function(boids, groupTogether) {
    // 记录当前蝌蚪位置
    this.lastLoc = this.position.clone()
    // 不排队
    if (!groupTogether) {
      this.flock(boids)
    } else {
      this.align(boids)
    }
    this.borders()
    this.update()
    this.calculateTail()
    this.moveHead()
  },
  // We accumulate a new acceleration each time based on three rules
  flock: function(boids) {
    const separation = this.separate(boids).multiply(3)
    const alignment = this.align(boids)
    const cohesion = this.cohesion(boids)
    this.acceleration = this.acceleration.add(separation, alignment, cohesion)
  },
  separate: function(boids) {
    const desiredSeperation = 60
    let steer = new paper.Point()
    let count = 0
    // For every boid in the system, check if it's too close
    for (let i = 0, l = boids.length; i < l; i++) {
      const other = boids[i]
      const vector = this.position.subtract(other.position)
      const distance = vector.length
      if (distance > 0 && distance < desiredSeperation) {
        // Calculate vector pointing away from neighbor
        steer = steer.add(vector.normalize(1 / distance))
        count++
      }
    }
    // Average -- divide by how many
    if (count > 0) { steer = steer.divide(count) }
    if (!steer.isZero()) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.length = this.maxSpeed
      steer = steer.subtract(this.vector)
      steer.length = Math.min(steer.length, this.maxForce)
    }
    return steer
  },

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align: function(boids) {
    const neighborDist = 25
    let steer = new paper.Point()
    let count = 0
    for (let i = 0, l = boids.length; i < l; i++) {
      var other = boids[i]
      var distance = this.position.getDistance(other.position)
      if (distance > 0 && distance < neighborDist) {
        steer = steer.add(other.vector)
        count++
      }
    }

    if (count > 0) { steer = steer.divide(count) }
    if (!steer.isZero()) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.length = this.maxSpeed
      steer = steer.subtract(this.vector)
      steer.length = Math.min(steer.length, this.maxForce)
    }
    return steer
  },

  // Cohesion
  // For the average location (i.e. center) of all nearby boids,
  // calculate steering vector towards that location
  cohesion: function(boids) {
    const neighborDist = 100
    let sum = new paper.Point()
    let count = 0
    for (let i = 0, l = boids.length; i < l; i++) {
      const other = boids[i]
      const distance = this.position.getDistance(other.position)
      if (distance > 0 && distance < neighborDist) {
        sum = sum.add(other.position) // Add location
        count++
      }
    }
    if (count > 0) {
      sum = sum.divide(count)
      // Steer towards the location
      return this.steer(sum, false)
    }
    return sum
  },
  // A method that calculates a steering vector towards a target
  // Takes a second argument, if true, it slows down as it approaches
  // the target
  steer: function(target, slowdown) {
    let steer
    const desired = target.subtract(this.position)
    const distance = desired.length
    // Two options for desired vector magnitude
    // (1 -- based on distance, 2 -- maxSpeed)
    if (slowdown && distance < 100) {
      // This damping is somewhat arbitrary:
      desired.length = this.maxSpeed * (distance / 100)
    } else {
      desired.length = this.maxSpeed
    }
    steer = desired.subtract(this.vector)
    steer.length = Math.min(this.maxForce, steer.length)
    return steer
  },
  borders: function() {
    const vector = new paper.Point()
    const position = this.position
    const radius = this.radius
    const size = paper.view.size
    if (position.x < -radius) vector.x = size.width + radius
    if (position.y < -radius) vector.y = size.height + radius
    if (position.x > size.width + radius) vector.x = -size.width - radius
    if (position.y > size.height + radius) vector.y = -size.height - radius
    if (!vector.isZero()) {
      this.position = this.position.add(vector)
      const segments = this.path.segments
      for (let i = 0; i < this.amount; i++) {
        segments[i].point = segments[i].point.add(vector)
      }
    }
  },
  update: function() {
    // Update velocity
    this.vector = this.vector.add(this.acceleration)
    // Limit speed (vector#limit?)
    this.vector.length = Math.min(this.maxSpeed, this.vector.length)
    this.position = this.position.add(this.vector)
    // Reset acceleration to 0 each cycle
    this.acceleration = new paper.Point()
  },
  calculateTail: function() {
    //   处理颈部及尾巴
    const segments = this.path.segments
    const shortSegments = this.shortPath.segments
    const speed = this.vector.length
    const pieceLength = 5 + speed / 3
    let point = this.position
    segments[0].point = this.position.clone()
    shortSegments[0].point = this.position.clone()

    // Chain goes the other way than the movement
    // console.log('this.vector:', this.vector)
    // console.log('------------this.vector:', this.vector.project(new paper.Point(0, 0)))

    let lastVector = this.vector.rotate(180, new paper.Point((0,0)))
    for (let i = 1; i < this.amount; i++) {
      const vector = segments[i].point.subtract(point)
      this.count += speed * 10
      const wave = Math.sin((this.count + i * 3) / 300)
      let sway = lastVector.rotate(90).normalize(wave);
      point = point.add(lastVector.normalize(pieceLength), sway);
      segments[i].point = point
      if (i < 3) { shortSegments[i].point = point }
      lastVector = vector
    }
    this.path.smooth()
  },
  moveHead: function() {
    this.head.position = this.position
    this.head.rotation = this.vector.angle
  },
  arrive: function(target) {
    this.acceleration = this.acceleration.add(this.steer(target, true))
  }

})

export {
  Boid
}
