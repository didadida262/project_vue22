import paper from 'paper'


const Boid = paper.Base.extend({
    initialize: function (position, maxSpeed, maxForce) {
        var strength = Math.random() * 0.5;
        this.acceleration = new paper.Point();
        this.vector = paper.Point.random();
        this.position = position.clone();
        this.radius = 30;
        this.maxSpeed = maxSpeed + strength;
        this.maxForce = maxForce + strength;
        this.amount = strength * 10 + 10;
        this.count = 0;
        this.createItems();
    },
    createItems: function() {
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