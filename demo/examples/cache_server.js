var cacheServer, Untrusted, Volatile, Auditing, EncripterT, PersistentT, LoggerT;

cacheServer = {
  values: {},
  store: function(key, value) {
    this.values[key] = value;
  },
  lookup: function(key) {
    return this.values[key];
  },
  remove: function(key) {
    delete this.values[key];
  }
};

Untrusted = new Context('untrusted');
Volatile = new Context('volatile');
Auditing = new Context('auditing');

EncripterT = new Trait({
  encrypt: function(value) {
    return "&&" + value + "%%";
  },
  decrypt: function(value) {
    return value.slice(2, value.length - 2);
  },
  store: function(key, value) {
    var encryptedValue = this.encrypt(value);
    print("Privacy: cacheServer.store(" + key + ", " + encryptedValue + ")");
    this.proceed(key, encryptedValue);
  },
  lookup: function(key) {
    var encryptedValue = this.proceed(key);
    if (encryptedValue) {
      print("Privacy: cacheServer.lookup(" + key + ") returned " + encryptedValue);
      var decryptedValue = this.decrypt(encryptedValue);
      return decryptedValue;  
    }
  }
});

PersistentT = new Trait({
  backupValues: {},
  store: function(key, value) {
    print("Backup:  cacheServer.backupValues[" + key + "] = " + value);
    this.backupValues[key] = value;
    this.proceed(key, value);
  },
  backupLookup: function(key) {
    var value = this.backupValues[key];
    print("Backup:  cacheServer.backupLookup(" + key + ") returned " + value);
    return value;
  }
});

LoggerT = new Trait({
  store: function(key, value) {
    print("Debug:   cacheServer.store(" + key + ", " + value + ")");
    this.proceed(key, value);
  },
  lookup: function(key) {
    var value = this.proceed(key);
    print("Debug:   cacheServer.lookup(" + key + ") returned " + value);
    return value;
  },
  remove: function(key) {
    print("Debug:   cacheServer.remove(" + key + ")");
    this.proceed(key);
  }
});

Untrusted.adapt(cacheServer, EncripterT);
Volatile.adapt(cacheServer,PersistentT);
Auditing.adapt(cacheServer, LoggerT);

Auditing.activate();
Volatile.activate();

cacheServer.store("1", 1);
cacheServer.lookup("1");
cacheServer.remove("1");
