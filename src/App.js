/* 
  Buradan başlayın ve iç içe geçmiş bileşenlere doğru ilerleyin.
  Projedeki tüm dosyalara kod eklenmesi gerekmez.
  Nerelerde değişiklik yapmanız gerektiğini anlamak için her dosyayı inceleyin.
*/

// State hook u import edin
// Gönderiler (çoğul!) ve AramaÇubuğu bileşenlerini import edin, çünkü bunlar App bileşeni içinde kullanılacak
// sahteVeri'yi import edin
import { useState } from "react";
import React from "react";
import Gonderiler from "../src/bilesenler/Gonderiler/Gonderiler.js";
import AramaCubugu from "../src/bilesenler/AramaCubugu/AramaCubugu.js";
import sahteVeri from "./sahte-veri.js";
import "./App.css";

const App = () => {
  // Gönderi nesneleri dizisini tutmak için "gonderiler" adlı bir state oluşturun, **sahteVeri'yi yükleyin**.
  const [gonderiler, setGonderiler] = useState(sahteVeri);
  const [arama, setArama] = useState("");
  const [begenilenler, setBegenilenler] = useState([]);

  const gonderiyiBegen = (gonderiID) => {
    setGonderiler(
      gonderiler.map((item) => {
        if (item.id === gonderiID && !begenilenler.includes(gonderiID)) {
          item.likes++;
          begenilenler.push(gonderiID);
          setBegenilenler(begenilenler);
        }
        return item;
      })
    );
    /*
      Bu fonksiyon, belirli bir id ile gönderinin beğeni sayısını bir artırma amacına hizmet eder.

      Uygulamanın durumu, React ağacının en üstünde bulunur, ancak iç içe geçmiş bileşenlerin stateleri değiştirememesi adil olmaz!
      Bu fonksiyon, belirli bir gönderinin beğeni sayısını artırılmasına olanak sağlamak amacıyla iç içe geçmiş bileşenlere aktarılır.

	  "setGonderi" yi çağırın ve state ine "posts.map" çağrısını iletin.
      `map` içine iletilen callback aşağıdaki mantığı gerçekleştirir:
        - gönderinin idsi "gonderiID" ile eşleşirse, istenen değerlerle yeni bir gönderi nesnesi döndürün.
        - aksi takdirde, sadece gönderi nesnesini değiştirmeden döndürün.
     */
    const updatedPosts = gonderiler.map((gonderi) => {
      if (gonderiID === gonderi.id) {
        gonderi.likes++;
      }
      return gonderi;
    });

    setGonderiler(updatedPosts);
  };

  const textChangeHandler = (evn) => {
    setArama(evn.target.value);
    const filterGonderiler = sahteVeri.filter((item) => {
      return (
        item.username.includes(evn.target.value) ||
        item.timestamp.includes(evn.target.value)
      );
    });
    setGonderiler(filterGonderiler);
  };

  return (
    <div className="App">
      <AramaCubugu
        arama={arama}
        setArama={setArama}
        textChangeHandler={textChangeHandler}
      />
      <Gonderiler gonderiler={gonderiler} gonderiyiBegen={gonderiyiBegen} />
      {/* Yukarıdaki metni projeye başladığınızda silin*/}
      {/* AramaÇubuğu ve Gönderiler'i render etmesi için buraya ekleyin */}
      {/* Her bileşenin hangi proplara ihtiyaç duyduğunu kontrol edin, eğer ihtiyaç varsa ekleyin! */}
    </div>
  );
};

export default App;
