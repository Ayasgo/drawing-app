const canvas = document.createElement('canvas');
const container = document.getElementById('container')
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = 400;
imgsToRemove = []

function create_image(paths, name) {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let shape = new Shape(paths);
    shape.draw(ctx);
    data = canvas.toDataURL('image/png');
    img = document.createElement('img');
    img.id = name;
    img.addEventListener('click', (evt) => {
        if (!imgsToRemove.includes(evt.target.id)) {
            imgsToRemove.push(name);
            evt.target.classList.add("redimg");
        } else {
             imgsToRemove = imgsToRemove.filter(item => item!=name)
             evt.target.classList.remove("redimg");
        }
        console.log(imgsToRemove);
    })
    img.src = data;
    container.appendChild(img)
}

classList = house
for (i of Object.keys(classList)) {
  create_image(classList[i], i);
}




imgsToRemove_for_car = [
  "70",
  "82",
  "88",
  "100",
  "106",
  "110",
  "170",
  "201",
  "225",
  "242",
  "246",
  "285",
  "308",
  "338",
  "385",
  "399",
  "403",
  "422",
  "428",
  "430",
  "442",
  "449",
  "461",
  "462",
  "477",
  "501",
  "576",
  "582",
  "601",
  "614",
  "608",
  "609",
  "616",
  "619",
  "620",
  "656",
  "657",
  "653",
  "670",
  "676",
  "673",
  "697",
];

imgsToRemove_for_fish = (35)[
  ("44",
  "54",
  "82",
  "100",
  "105",
  "111",
  "170",
  "201",
  "252",
  "282",
  "331",
  "337",
  "349",
  "399",
  "422",
  "428",
  "442",
  "461",
  "464",
  "462",
  "471",
  "477",
  "482",
  "501",
  "576",
  "581",
  "608",
  "609",
  "616",
  "655",
  "668",
  "678",
  "676",
  "701",
  "698")
];

imgsToRemove_for_bicycle = [
  "698",
  "703",
  "47",
  "54",
  "65",
  "82",
  "100",
  "166",
  "170",
  "190",
  "287",
  "331",
  "399",
  "422",
  "428",
  "442",
  "462",
  "500",
  "584",
  "587",
  "576",
  "608",
  "609",
  "616",
  "646",
  "657",
  "670",
  "673",
  "678",
  "676",
  "692",
];

imgsToRemove_for_house = [
  "42",
  "47",
  "54",
  "80",
  "85",
  "100",
  "151",
  "164",
  "170",
  "197",
  "198",
  "201",
  "203",
  "252",
  "259",
  "325",
  "331",
  "340",
  "358",
  "385",
  "399",
  "388",
  "422",
  "425",
  "442",
  "461",
  "462",
  "482",
  "484",
  "499",
  "526",
  "551",
  "550",
  "559",
  "576",
  "565",
  "604",
  "608",
  "609",
  "616",
  "619",
  "655",
  "657",
  "676",
  "686",
  "698",
  "703",
];