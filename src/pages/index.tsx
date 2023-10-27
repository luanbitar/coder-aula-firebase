import { Inter } from "next/font/google";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });

import firebase_app from "../firebase/config";

export default function Home() {
  const onAdd = () => {
    console.log("Começando a adicionar um item");
    const order = {
      buyer: { name: "John Doe", email: "john@doe.com", phone: "1234123123" },
      items: [
        {
          name: "Product 1",
          price: 10,
        },
        {
          name: "Product 2",
          price: 20,
        },
      ],
      total: 30,
    };
    const db = getFirestore(firebase_app);
    const ordersCollection = collection(db, "orders");

    addDoc(ordersCollection, order);

    console.log("Item adicionado com sucesso");
  };

  const onUpdate = () => {
    console.log("Começando a atualizar um item");
    const db = getFirestore(firebase_app);
    const document = doc(db, "orders", "RkWfAVNYqt5zexdBCIpH");

    updateDoc(document, {
      total: 20200329,
    });
    console.log("Item atualizado com sucesso");
  };

  const onBatchUpdate = () => {
    console.log("Começando a atualizar em lote");
    const db = getFirestore(firebase_app);

    const document1 = doc(db, "orders", "RkWfAVNYqt5zexdBCIpH");
    const document2 = doc(db, "orders", "jSfztaizP1TbR2N2P68P");

    const batch = writeBatch(db);

    batch.update(document1, { total: 0 });
    batch.set(document2, { total: 1 });

    batch.commit();
    console.log("Atualização em lote finalizada");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button className="bg-white p-3 rounded text-slate-900" onClick={onAdd}>
        Criar documento
      </button>

      <button
        className="bg-white p-3 rounded text-slate-900"
        onClick={onUpdate}
      >
        Atualizar documento
      </button>

      <button
        className="bg-white p-3 rounded text-slate-900"
        onClick={onBatchUpdate}
      >
        Atualizar em lote
      </button>
    </main>
  );
}
