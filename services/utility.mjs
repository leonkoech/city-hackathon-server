
const names = [
    "John Smith",
    "Jane Doe",
    "Michael Johnson",
    "Emily Davis",
    "Liam Smith",
    "Olivia Johnson",
    "Noah Williams",
    "Emma Brown",
    "Aiden Davis",
    "Sophia Taylor",
    "Lucas Martinez",
    "Avery Anderson",
    "Mason Thomas",
    "Isabella Jackson",
    "Carter Harris",
    "Ella Martin",
    "James White",
    "Grace Clark",
    "Logan Lewis",
    "Aria Robinson",
    "Jacob Walker",
    "Lily Hall",
    "Michael Young",
    "Nora Hill"
  ];
  
  function getRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }
  
  export function generateRandomUID(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uid = "";
    for (let i = 0; i < length; i++) {
      uid += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uid;
  }
  
  function generateRandomDateOfBirth() {
    const year = Math.floor(Math.random() * (2022 - 2006) + 2006);
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // Assume maximum 28 days in a month
    return `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;
  }
  
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  export function generateRandomBoolean() {
    return Math.random() < 0.5; // 50% chance of being true
  }
  
  function generateRandomApplicant() {
    const obj = {
      name: getRandomName(),
      UID: String(generateRandomUID(16)),
      DOB: generateRandomDateOfBirth(),
      over_18: true,
      family_size: generateRandomNumber(1, 5),
      income_range: `$${generateRandomNumber(21000, 119999)} - $${generateRandomNumber(21001, 120000)}`,
      employment: generateRandomBoolean(),
      type: Math.random() < 0.33 ? "full time" : (Math.random() < 0.66 ? "part time" : "temp"),
      residency: "Broward County",
      married: generateRandomBoolean(),
      dependents: generateRandomNumber(1, 5),
      willing_to_complete_300_hours_volunteering: generateRandomBoolean(),
      willing_to_do_8_12_month_program: generateRandomBoolean(),
      consistent_income: generateRandomBoolean(),
      willing_to_join_advocacy: generateRandomBoolean(),
    };
  
    // Randomly set some fields to empty
    if (Math.random() < 0.25) obj.income_range = "";
    if (Math.random() < 0.25) obj.type = "";
    if (Math.random() < 0.25) obj.married = null;
    if (Math.random() < 0.25) obj.dependents = null;
    if (Math.random() < 0.25) obj.consistent_income = null;
  
    return obj;
  }
  
  
 export function generateRandomApplicants(numberOfRandomApplicants){
    const applicants = [];
    for (let i = 0; i < numberOfRandomApplicants; i++) {
      applicants.push(generateRandomApplicant());
    }
    return applicants
  }

  export function getRandomDate(end_day) {
  
    const today = new Date();
    const thirtyDaysLater = new Date(today);
    thirtyDaysLater.setDate(today.getDate() + end_day);
  
    const randomTimestamp = today.getTime() + Math.random() * (thirtyDaysLater.getTime() - today.getTime());
    const randomDate = new Date(randomTimestamp);
    
    return randomDate;
  }

  export function containsBlankField(object){
    for(let values of Object.values(object)){
        if(values === "" || values === undefined || values === null){
            return true;
        }
    }
    return false;
  }

  export function containsFalseField(list){
    list.forEach((object) => {
        for(let value of Object.values(object)){
            if(!value){
                return true;
            }
        }
    });
    return false;
  }