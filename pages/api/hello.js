import {db} from "../../firebase";
import {doc, getDoc} from "firebase/firestore";


export default async function handler(req, res) {

    try {
        let docSnap = await getDoc(doc(db, "users", "kzyRsV43rtXldggtNNJrqCNJH8i2"));
        let user = docSnap.data();
        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
