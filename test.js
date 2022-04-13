const Pet = function(name, year) {
  const that = {
    name: name,
    year: year,
    say: function() {
      console.log(`i am ${that.name},and ${that.year} old years`)
    }
  }
  return that
}

const Dog = function(name, year) {
  const that = Pet(name, year)
  return that
}
const dog = Dog('kaka', 2)
dog.name = 'nima'
console.log(dog)
dog.say()
