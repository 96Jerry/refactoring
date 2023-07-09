# Chapter 06

# 캡슐화

- 시스템에서 모듈화를 잘 하기 위해선 각 모듈이 자신을 제외한 다른 부분에 드러내지 말아야 할 비밀을 잘 숨겨야한다.

- 레코드, 컬렉션, 객체, 클래스의 차이점?

## 7.1 레코드 캡슐화하기

- 캡슐화는 아래와 같이 입력 데이터 레코드와의 연결을 끊어준다.

```javascript
// before, organization.name
const organization = { name: "구스베리", country: "GB" };

// after, getOrganization().name;
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }
  set name(aString) {
    this._name = aString;
  }
  get country() {
    return this._country;
  }
  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}
const organization = new Organization({ name: "구스베리", country: "GB" });
function getOrganization() {
  return organization;
}
```

- 중첩된 레코드의 경우

```javascript
// before, customerData[customerID].usages[year][month]
customerData = {
  1920: {
    name: "마틴파울러",
    usages: {
      2016: {
        1: 50,
      },
      2017: {
        3: 40,
      },
    },
  },
  38673: {
    name: "닐포드",
    usages: {
      2017: {
        2: 40,
      },
      2018: {
        5: 70,
      },
    },
  },
};

// after,
class CustomerData {
  constructor(data) {
    this._data = data;
  }
  setUsage(customerID, yaer, month, amount) {
    this._data[customerID].usages[year][month] = amount;
  }

  get rawData() {
    return _.cloneDeep(this._data);
  }

  usage() {
    return this._data[customerID].usages[year][month];
  }
}
```

q1. set usage는 왜 띄어쓰기를 하지 않는지?
q2. usage는 왜 get을 쓰지 않는지?

- 사용자에게 입력 데이터를 복사해서 던져주는 방법도 있지만 이렇게되면 사용자의 수정을 막을 수 있는 방법이 없다.
- 데이터를 수정하려 할 때 에러를 던지게 만들어 줄 수도 있다.
- 읽기전용 프락시를 제공해 줄 수도 있다.
  <br>
  <br>
- 레코드 캡슐화를 재귀적으로 실행해줄 수도 있다.
- 확실하지만, 데이터 구조가 거대하고 값들을 안쓰는 것들이 있다면 비효율적일 수 있다.
- 클래스와 게터를 잘 혼합해서 사용하는 것이 나을 수 있다.

## 7.2 컬렉션 캡슐화하기

- 컬렉션에 접근하려면 컬렉션이 소속된 클래스의 메소드를 반드시 거치게 만들어준다.
- 컬렉션을 클라이언트가 실수로 바꾸는 경우를 막아준다.
- 표준 인터페이스 대신 전용 메서드들을 사용하게 하면 부가적인 코드가 늘어나고 컬렉션 연산들을 조합해서 쓰기도 어렵다.
  <br>
  <br>
- 컬렉션을 읽기 전용으로 제공한다.
  <br>
  <br>
- 컬렉션 게터를 사용할 때 복제된 값을 반환하게끔 한다.

```javascript
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }

  get courses() {
    return this._courses.slice();
  }

  set courses(aList) {
    this._courses = aList.slice();
  }
}
```

q1. get courses 에 slice()를 붙여주는 이유?

- `set courses()` 에서 `slice()`를 해주지 않는다면 사용자는 courses를 수정할 수 있다. 캡슐화가 깨지게 된다.
- 개별 원소를 추가하고 제거하는 메소들를 추가해주면 캡슐화가 된다.

## 7.3 기본형을 객체로 바꾸기

```javascript
class Order {
  constructor(data) {
    this._priority = data.priority;
  }

  get priority() {
    return this._priority;
  }

  get priorityString() {
    return this._priority.toString();
  }

  set priority(aString) {
    this._priority = new Priority(aString);
  }
}

class Priority {
  constructor(value) {
    if (value instanceof Priority) return value;
    this._value = value;
  }

  toString() {
    return this._value;
  }
}
```

- Order 클래스의 set, get priority 메소드를 Priority 클래스를 활용해서 바꿔준다.
- Order 클래스의 get priority -> get priorityString
- 추가사항
  - Order 클래스에 get priority 메소드를 추가해준다.
