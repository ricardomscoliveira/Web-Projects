// Firebase Configuration
var config = {
    apiKey: "AIzaSyDNnPlCRCi67hJ3qNCeKeNd8V7ZPlRFCfk",
    authDomain: "rnfirebasenotes.firebaseapp.com",
    databaseURL: "https://rnfirebasenotes-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rnfirebasenotes",
    storageBucket: "rnfirebasenotes.appspot.com",
    messagingSenderId: "97586623645",
    appId: "1:97586623645:web:dc090eaee1b691d303d074"
  };
  firebase.initializeApp(config);

  const db = firebase.firestore();
  const cities = db.collection('Tasks');

  // Dynamic changes to text
  cities.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      switch (change.type) {
        case 'added':
          cityAdded({ name: change.doc.id, description: change.doc.data().description });
          break;
        case 'modified':
          cityUpdated({ name: change.doc.id, description: change.doc.data().description });
          break;
        case 'removed':
          cityRemoved(change.doc.id);
          break;
      }
    })
  })

  // Create on firestore
  const citiesDiv = document.querySelector('#all-cities');
  const cityAdded = city => {
    const p = document.createElement('p');
    p.setAttribute(
      'style',
      'margin-left: 6%;'
    );
    p.textContent = `${city.description}`;
    p.id = city.name;
    const d = document.createElement('button');
    d.setAttribute(
      'style',
      'margin-left: 39%; color: red; background-color: lightgray; border-radius: 10px;'
    );
    d.textContent = 'Eliminar';
    d.onclick = () => deleteCity(city.name);
    p.appendChild(d);
    citiesDiv.appendChild(p);
  }

  // Read from firestore
  const cityUpdated = city => {
    document.querySelector('#' + city.name).textContent = `${city.description}`;
  }

  // Update on firestore
  const updatePopulation = (city, pop) => {
    cities.doc(city).update({
      description: description
    })
  }

  // Delete from firestore
  const deleteCity = city => {
    cities.doc(city).delete();
  }

  const cityRemoved = name => {
    document.querySelector('#' + name).remove();
  }