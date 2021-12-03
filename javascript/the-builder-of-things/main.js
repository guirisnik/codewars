class Thing {
  name = ''
  is = new Is()
  
  constructor(name = '') {
    this.name = name;
  }
  
  get is_a() {
    this.is.setValueToAssociate(true)
    return this.is;
  }
  
  get is_not_a() {
    this.is.setValueToAssociate(false)
    return this.is;
  }

  get is_a_person() {
    return this.is.isPerson;
  }
}

class Is {
  valueToAssociate = false
  isPerson = false
  isWoman = false
  isMan = false
  
  set setValueToAssociate(value) {
    this.valueToAssociate = value;
  }

  get person() {
    this.isPerson = this.valueToAssociate;
  }
  
  get woman() {
    this.isWoman = this.valueToAssociate;
  }
  
  get man() {
    this.isMan = this.valueToAssociate;
  }
}

let jane = new Thing('Jane')

jane.is_a.person

console.info(jane.is_a_person)
console.info('stop');