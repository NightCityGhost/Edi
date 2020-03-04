const userReducer = (users) => {
    const reducedUsers = users.map(user => {
        const {gender, name, location, email, login, dob, registered, phone, cell, id, picture, nat} = user;
        const annual_wage = generateWages(60000).annual;
        
        user = {
            name: `${name.first} ${name.last}`,
            gender: capitalizeFirst(gender),
            country: location.country,
            email: email,
            age: dob.age,
            cell: cell,
            image: picture.large,
            "Annual Wages": annual_wage
        };

        return user;
    });

    return reducedUsers;
};

const listReducer = (users, parseWages=true) => {
    const reducedList = users.map(user => {
        const { image, ...user_data } = user; // leave image
        if(!parseWages) return user_data;
        user = {...user_data, "Annual Wages": user["Annual Wages"].toLocaleString()+" $"};
        return user;
    });
    return reducedList;
};

const genderReducer = (users) => {
    const values = users.map(user => user.gender)
        .reduce((acc, gender) => gender==="Male"? [acc[0]+1,acc[1]] : [acc[0],acc[1]+1], [0,0]);
    
    const gender = {
        values: values,
        labels: ["Male", "Female"]
    };
    return gender;
};

const ageReducer = (users) => {
    const age = users.map(user => Number(user.age));
    return age;
};

const wagesReducer = (users) => {
    const wages = users.map(user => Number(user["Annual Wages"]));
    return wages;
};

// const reduced_user = {
//     name: "name.first+name.last",
//     gender: "gender",
//     country: "location.country",
//     email: "email",
//     age: "dob.age",
//     cell: "cell",
//     image: "picture.large"
// }

/* sample user
{
    "gender":"female",
    "name":{
        "title":"Miss",
        "first":"Sara",
        "last":"Larsen"
    },
    "location":{
        "street":{
            "number":521,
            "name":"Højbjergvej"
        },
        "city":"Odense Sv",
        "state":"Hovedstaden",
        "country":"Denmark",
        "postcode":24037,
        "coordinates":{
            "latitude":"-31.2991",
            "longitude":"19.6172"
        },
        "timezone":{
            "offset":"+7:00",
            "description":"Bangkok, Hanoi, Jakarta"
        }
    },
    "email":"sara.larsen@example.com",
    "login":{
        "uuid":"c71d0593-2548-4535-ba26-756f03c080be",
        "username":"happyladybug381",
        "password":"bluesman",
        "salt":"vsGvmvpP",
        "md5":"bf862b70c105c11e7c2e8b8be53912d0",
        "sha1":"14bbb69ae99b547f994e700e8706d5e0137e8941",
        "sha256":"14f147d7a8d32d313cfbfaf7ecea44f06cdf54abf2357cbf2961e285689561f5"
    },
    "dob":{
        "date":"1967-05-16T19:48:01.548Z",
        "age":53
    },
    "registered":{
        "date":"2019-03-29T15:14:59.437Z",
        "age":1
    },
    "phone":"27050788",
    "cell":"16396385",
    "id":{
        "name":"CPR",
        "value":"160567-7118"
    },
    "picture":{
        "large":"https://randomuser.me/api/portraits/women/4.jpg",
        "medium":"https://randomuser.me/api/portraits/med/women/4.jpg",
        "thumbnail":"https://randomuser.me/api/portraits/thumb/women/4.jpg"
    },
    "nat":"DK"
}
*/