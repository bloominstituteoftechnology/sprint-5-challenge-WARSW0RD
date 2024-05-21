async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

  let mentors = [] // fix this
  let learners = [] // fix this
  //async function fetchData() {
    try {
        let mentorsResponse = await axios.get('http://localhost:3003/api/mentors');
        let learnersResponse = await axios.get('http://localhost:3003/api/learners');

        mentors = mentorsResponse.data;
        learners = learnersResponse.data;

        //console.log(learners);
        //console.log(mentors);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
//}



  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }
  //learners.mentor = mentors.id;
  /*fetchData().then(() => {
    learners.forEach((learner) => {
      let id = learner.id
      let fullName = learner.fullName
      let email = learner.email
      let mentor = learner.mentors
      let mentorNames = []
      mentors.forEach((mentorId) => {
        let matchingMentor = mentors.find(mentor => mentor.id === mentorId);
        if (matchingMentor) {
          matchingMentor.push(mentorNames);
        }

      })
      if (matchingMentor) {
          console.log(`Learner ${learner.name} is mentored by ${matchingMentor.name}`);
      }   else {
          console.log(`Learner ${learner.name} has no mentor`);
      }
      
    });
    if (mentorNames < 0) {
      console.log(`Learner ${fullName} is mentored by ${mentorNames.join(',')}` )
    } else {
      console.log(`Learner ${fullName} has no mentor`)
    }
  })*/
  //fetchData().then(() => {
    learners.forEach((learner) => {
        let id = learner.id;
        let fullName = learner.fullName;
        let email = learner.email;
        let mentorIds = learner.mentors;
        let mentorNames = [];
        

        mentorIds.forEach((mentorId) => {
            let matchingMentor = mentors.find(mentor => mentor.id === mentorId);
            //console.log('matchingMentor:', matchingMentor);
            if (matchingMentor) {
              mentorNames.push(`${matchingMentor.firstName} ${matchingMentor.lastName}`);
            }
        });
        learner.mentors = mentorNames;
        

        /*if (mentorNames.length > 0) {
            console.log(`Learner ${fullName} is mentored by ${mentorNames.join(', ')}`);
        } else {
            console.log(`Learner ${fullName} has no mentor`);
        }*/
        
    })
//});

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  console.log(cardsContainer);
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'
  
  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of learners) { // looping over each learner object
    
    console.log(learner.fullName);
    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const card = document.createElement('div')
    card.classList.add('card')

    const heading = document.createElement('h3');
    heading.textContent = `${learner.fullName}`;
    card.appendChild(heading);

    const email = document.createElement('div')
    email.textContent = `${learner.email}`;
    card.appendChild(email);

    const mentorHeading = document.createElement('h4')
    mentorHeading.textContent = `Mentors`;
    mentorHeading.classList.add('closed')
    card.appendChild(mentorHeading);

    const mentorsList = document.createElement('ul')
    for (let mentor of learner.mentors) {
      let li = document.createElement('li');
      li.textContent = mentor;
      mentorsList.appendChild(li);
    }


    
    
    

    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
