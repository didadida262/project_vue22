import paper from 'paper'

const Boid = paper.Base.extend({
    initialize: function(position, maxSpeed, maxForce) {
        console.log('执行initialize')
        const strength = Math.random() * 0.5
        this.acceleration = new paper.Point()
        this.vector = paper.Point.random()
        this.vector.x = this.vector.x * 2 - 1
        this.vector.y = this.vector.y * 2 - 1
        this.position = position.clone()
        this.radius = 30
        this.maxSpeed = maxSpeed + strength
        this.maxForce = maxForce + strength
        this.amount = strength * 10 + 10
        this.count = 43366.76471028296
        this.createItems()
        },

        createItems: function() {
            console.log('执行createItems')

            this.head = new paper.Shape.Ellipse({
                center: [0, 0],
                size: [13, 8],
                fillColor: 'white'
            });
    
            this.path = new paper.Path({
                strokeColor: 'white',
                strokeWidth: 2,
                strokeCap: 'round'
            });
            for (var i = 0; i < this.amount; i++)
                this.path.add(new paper.Point());
    
            this.shortPath = new paper.Path({
                strokeColor: 'white',
                strokeWidth: 4,
                strokeCap: 'round'
            });
            for (var i = 0; i < Math.min(3, this.amount); i++)
                this.shortPath.add(new paper.Point());
        },
})


export {
    Boid
}