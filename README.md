# ai-games-recommendation
Monkey Playin' is a games recommendation system using AI models, for 1st year of Internet Systems Engineering Master's Degree.
Made in collaboration with @robbycode29 (for the django server)

Angular was used for frontend dev, using firebase for authentification, database and storage. Also, an additonal node server was created to process the request sent by the web app.

RO Documentation

1.	Colectia de date 
Colectia de date pusa la dispozitie algoritmului de sugestie este aceeași cu setul de date utilizat in antrenarea modelului bazat pe Tensorflow Recommenders.

2.	Arhitectura API-ului 
Aplicatia backend este rulata in productie folosind containere de Docker, putand fi accesata live la api-monkeyplayin.onrender.com (serviciu de hostare gratuit cu spin off la inactivitate). 
Aplicatia are la baza un serviciu Django, in care am construit un endpoint (“/recommend”) la care pot fi realizate request-uri continand ca parametrii un string “genre” si returnand un array de titluri de jocuri. 
Functia accesata odata cu trimiterea unei cereri catre acest endpoint este o funcție Django care răspunde la cererile HTTP pentru recomandări de jocuri. Aceasta funcționează prin încărcarea unui model de învățare automată antrenat, aplicarea acestuia la un set de date de jocuri și returnarea rezultatelor ca răspuns JSON. 
Mai întâi, funcția încarcă două modele Keras pre-antrenate: games_model și genres_model. Acestea sunt modele de încorporare care transformă titlurile de jocuri și genurile în vectori de încorporare într-un spațiu multidimensional. Aceste încorporări sunt apoi utilizate pentru a calcula similaritățile între diferite jocuri. 
Apoi, funcția încarcă ponderile modelului dintr-un fișier separat. Acestea sunt parametrii modelului care au fost învățați în timpul antrenamentului. 
După aceea, funcția creează un index de căutare folosind tfrs.layers.factorized_top_k.BruteForce. Acest index este utilizat pentru a găsi cele mai similare jocuri pentru un anumit gen. 
Funcția apoi indexează toate jocurile din setul de date folosind modelul de jocuri. Acest lucru implică calcularea încorporărilor pentru fiecare joc și stocarea lor în index. În final, funcția preia genul solicitat din cererea HTTP, găsește cele mai similare jocuri în index și returnează o listă cu primele 20 de jocuri ca răspuns JSON. 

3.	Fullstack app
Pentru conectarea la server, la nivelul aplicației a fost creat un server „middleware” scris în Node.JS. 
Procesul interacțiunii utilizatorului este următorul: după logare, acesta este redirecționat către fereastra principală unde dispune de un număr de categorii, din care le poate selecta pe cele favorite. 
Categoriile sunt adăugate apoi în baza de date Firestore.
La fiecare reîncărcare a ferestrei, din componenta „results” (cea care conține tabelul cu rezultate) se apelează baza de date pentru a fi extrase preferințele, care mai apoi sunt trimise API-ului local al aplicației, care la rândul lui le prelucrează și le trimite la serverul de Node.
Serverul middleware va reverifica parametri primiți (pentru a avea formatul acceptat de serverul Django), și va face requestul folosind axios, trimițând înapoi răspunsul primit, care va fi printat în componenta results.
Preferințele utilizatorului vor rămâne salvate în baza de date până când acesta alege să le deselecteze din interfață. 
 

4. Limitări 
Acesta este un exemplu de filtrare colaborativa, insa care se ridica doar la un nivel demonstrativ. Modelul se bazeaza pe un set de date limitat pentru generarea sugestiilor si nu poate returna sugestii relevante pentru orice combinatie de genuri existente. In acest sens el poate face sugestii bazate doar pe genuri si nu pe alte categorii de clasificare. De asemenea API-ul este lansat pe o platorma cu un program gratuit cu resurse limitate, ceea ce-l face inaccesibil in anumite momente.


