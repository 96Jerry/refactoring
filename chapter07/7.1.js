class Organization {
  constructor(data) {
    this._name = data.name;
  }
  get name() {
    return this._name;
  }
}

const organization = new Organization({ name: "이름" });
// const organization = { name: '이름' };
function getOrganization() {
  return organization;
}

console.log(getOrganization().name);

// getOrganization()._name = '이름2';

// console.log(organization._name);
//
