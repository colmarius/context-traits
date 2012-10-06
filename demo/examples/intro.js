var noisy, noisyPerson, person;

person = {
  greet: function() {
    return 'hello';
  },
  toString: function() {
    return 'person';
  }
};

noisy = new Context('noisy');

noisyPerson = Trait({
  greet: function() {
    return 'HELLO';
  }
});

noisy.adapt(person, noisyPerson);
print(person.greet());

noisy.activate();
print(person.greet());

noisy.deactivate();
print(person.greet());