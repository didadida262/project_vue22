import paper from 'paper'

let Boid = paper.Base.extend({
    // 初始化tadpole类
    // position: 随机的point类坐标
    // maxSpeed： 10
    // maxForce:  0.05
    initialize: function(position, maxSpeed, maxForce) {
        this.position = position.clone()
        // 尾巴的点数
        this.amount = strength * 10 + 10
        let strength = Math.random() * 0.5

        this.acceleration = new paper.Point()
        this.vector = new paper.Point.random()
        this.radius = 30
        this.maxSpeed = maxSpeed + strength
        this.maxForce = maxForce + strength
        this.count = 0;
        this.createItems()
        },
        createItems: function() {
            // 椭圆，代表蝌蚪的头部
            this.head = new paper.Shape.Ellipse({
                center: [0, 0],
                size: [13, 8],
                fillColor: 'white'
            });
            // 尾巴
            this.path = new paper.Path({
                strokeColor: 'white',
                strokeWidth: 2,
                strokeCap: 'round'
            });
            // 目测是尾巴长度
            for (let i = 0; i < this.amount; i++)
                this.path.add(new paper.Point());
            // 颈部
            this.shortPath = new paper.Path({
                strokeColor: 'white',
                strokeWidth: 4,
                strokeCap: 'round'
            });
            for (let i = 0; i < Math.min(3, this.amount); i++)
                this.shortPath.add(new paper.Point());
        },    
        run: function(boids, groupTogether) {
            // 记录当前蝌蚪位置
            this.lastLoc = this.position.clone();
            // 不排队
            if (!groupTogether) {
                this.flock(boids);
            } else {
                this.align(boids);
            }
            // this.borders();
            // this.update();
            // this.calculateTail();
            // this.moveHead();
        },     
    // We accumulate a new acceleration each time based on three rules
    flock: function(boids) {
        let separation = this.separate(boids).multiply(3);
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        this.acceleration = this.acceleration.add(separation,alignment,cohesion);
        console.log('separation:', separation)
        console.log('alignment:', alignment)
        console.log('cohesion:', cohesion)
        console.log('this.acceleration:', this.acceleration)
    },  
    separate: function(boids) {
        let desiredSeperation = 60;
        let steer = new paper.Point();
        let count = 0;
        // For every boid in the system, check if it's too close
        for (let i = 0, l = boids.length; i < l; i++) {
            let other = boids[i];
            let vector = this.position.subtract(other.position);
            let distance = vector.length;
            if (distance > 0 && distance < desiredSeperation) {
                // Calculate vector pointing away from neighbor
                steer = steer.add(vector.normalize(1 / distance));
                count++;
            }
        }
        // Average -- divide by how many
        if (count > 0)
            steer = steer.divide(count);
        if (!steer.isZero()) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.length = this.maxSpeed;
            steer = steer.subtract(this.vector)
            steer.length = Math.min(steer.length, this.maxForce);
        }
        return steer;
    },

    // Alignment
    // For every nearby boid in the system, calculate the average velocity
    align: function(boids) {
        let neighborDist = 25;
        let steer = new paper.Point();
        let count = 0;
        for (let i = 0, l = boids.length; i < l; i++) {
            var other = boids[i];
            var distance = this.position.getDistance(other.position);
            if (distance > 0 && distance < neighborDist) {
                steer = steer.add(other.vector);
                count++;
            }
        }

        if (count > 0)
            steer = steer.divide(count);
        if (!steer.isZero()) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.length = this.maxSpeed;
            steer = steer.subtract(this.vector);
            steer.length = Math.min(steer.length, this.maxForce);
        }
        return steer;
    },

    // Cohesion
    // For the average location (i.e. center) of all nearby boids,
    // calculate steering vector towards that location
    cohesion: function(boids) {
        let neighborDist = 100;
        let sum = new paper.Point();
        let count = 0;
        for (let i = 0, l = boids.length; i < l; i++) {
            let other = boids[i];
            let distance = this.position.getDistance(other.position);
            if (distance > 0 && distance < neighborDist) {
                sum = sum.add(other.position); // Add location
                count++;
            }
        }
        if (count > 0) {
            sum = sum.divide(count);
            // Steer towards the location
            return this.steer(sum, false);
        }
        return sum;
    }, 
    // A method that calculates a steering vector towards a target
    // Takes a second argument, if true, it slows down as it approaches
    // the target
    steer: function(target, slowdown) {
        let steer,
            desired = target.subtract(this.position);
        let distance = desired.length;
        // Two options for desired vector magnitude
        // (1 -- based on distance, 2 -- maxSpeed)
        if (slowdown && distance < 100) {
            // This damping is somewhat arbitrary:
            desired.length = this.maxSpeed * (distance / 100);
        } else {
            desired.length = this.maxSpeed;
        }
        steer = desired.subtract(this.vector);
        steer.length = Math.min(this.maxForce, steer.length);
        return steer;
    },            

})


export {
    Boid
}