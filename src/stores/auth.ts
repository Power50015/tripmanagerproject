import { defineStore } from "pinia";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

// wait until auth is ready
const unsub = await onAuthStateChanged(auth, async (user) => {
  const auth = useAuthStore();
  if (user) {
    const q = query(collection(db, "admin"), where("email", "==", user.email));

    const querySnapshot = await getDocs(q);

    await querySnapshot.forEach((doc) => {
      auth.isLogin = true;
      auth.id = doc.id;
      auth.name = doc.data().name;
      auth.email = doc.data().email;
      auth.adrres = doc.data().adrres;
      auth.area = doc.data().area;
      auth.des = doc.data().des;
      auth.img = doc.data().img;
      auth.phone = doc.data().phone;
      auth.startTime = doc.data().startTime;
      auth.endTime = doc.data().endTime;
      auth.map = doc.data().map;
      auth.isloaded = true;
    });
  } else {
    auth.isloaded = true;
  }

  unsub();
});

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isloaded: false,
    isLogin: false,
    id: "",
    name: "",
    email: "",
    des: "",
    area: "",
    adrres: "",
    img: "",
    phone: "",
    startTime: 0,
    endTime: 0,
    map: "",

    fileUpload: 0,
  }),
  actions: {
    addUser(
      name: string,
      email: string,
      password: string,
      des: string,
      area: string,
      adrres: string,
      phone: string,
      img: string,
      startTime: number,
      endTime: number,
      map: string
    ): any {
      this.isloaded = false;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Add a new document in collection "hospitals"
          addDoc(collection(db, "admin"), {
            name: name,
            email: email,
            adrres: adrres,
            area: area,
            des: des,
            img: img,
            phone: phone,
            startTime: startTime,
            endTime: endTime,
            map: map,
          }).then((user) => {
            this.isLogin = true;
            this.id = user.id;
            this.name = name;
            this.email = email;
            this.adrres = adrres;
            this.area = area;
            this.des = des;
            this.img = img;
            this.phone = phone;
            this.startTime = startTime;
            this.endTime = endTime;
            this.map = map;
            this.isloaded = true;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.isloaded = true;
        });
      return this.isLogin;
    },
    login(email: string, password: string) {
      this.isloaded = false;
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(collection(db, "admin"), where("email", "==", email));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const auth = useAuthStore();
            auth.id = doc.id;
            auth.isLogin = true;
            auth.name = doc.data().name;
            auth.email = doc.data().email;
            auth.adrres = doc.data().adrres;
            auth.area = doc.data().area;
            auth.des = doc.data().des;
            auth.img = doc.data().img;
            auth.phone = doc.data().phone;
            this.startTime = doc.data().startTime;
            this.endTime = doc.data().endTime;
            this.map = doc.data().map;
            auth.isloaded = true;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.isloaded = true;
        });
    },
    logout() {
      signOut(auth).then(() => {
        this.isLogin = false;
        this.id = "";
        this.name = "";
        this.email = "";
        this.adrres = "";
        this.area = "";
        this.des = "";
        this.img = "";
        this.phone = "";
        this.startTime = 0;
        this.endTime = 0;
        this.map = "";
      });
    },
    async editUser(
      name: string,
      des: string,
      area: string,
      adrres: string,
      phone: string,
      img: string,
      startTime: number,
      endTime: number,
      map: string
    ) {
      await setDoc(doc(db, "admin", this.id), {
        name: name,
        email: this.email,
        adrres: adrres,
        area: area,
        des: des,
        img: img,
        phone: phone,
        startTime: startTime,
        endTime: endTime,
        map: map,
      }).then((user) => {
        this.name = name;
        this.adrres = adrres;
        this.area = area;
        this.des = des;
        this.img = img;
        this.phone = phone;
        this.startTime = startTime;
        this.endTime = endTime;
        this.map = map;
      });
    },
    addImage(img: string): any {
      addDoc(collection(db, "image"), {
        user:this.email,
        img: img,
      });
    },
  },
});
