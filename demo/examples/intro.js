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
quiet = new Context('quiet');

noisyPerson = Trait({
  greet: function() {
    return 'HELLO';
  }
});

quietPerson = Trait({
  greet: function() {
    return 'hi'; 
  }
});

noisy.adapt(person, noisyPerson);
quiet.adapt(person, quietPerson);

print(person.greet());

quiet.activate();
print(person.greet());

noisy.activate();
print(person.greet());

noisy.deactivate();
print(person.greet());

quiet.deactivate();
print(person.greet());
