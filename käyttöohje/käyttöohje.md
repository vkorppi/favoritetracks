## Esittely

Ohjelmalla voi hakea Spotify:sta kappaleita hakusanalla ja lisätä niitä omalle kappalelistalle, jonka voi siirtää oman Spotify-tilin playlistille. Muita ohjelman toiminallisuuksia ovat käyttäjienhallinta ja käyttäjien auktorisointi.

## Käyttäjätyypit

Ohjelmassa on kolmenlaisia käyttäjiä: tuntemattomat käyttäjät, kirjautuneet käyttäjät ja pääkäyttäjä, joka kuulu myös kirjautuneisiin käyttäjiin. Tuntemattomat käyttäjät ovat käyttäjiä, joilla ei ole käyttäjätiliä ja tästä syystä he eivät ole auktorisoituja kappelistaan eivätkä käyttäjienhallintaan liittyviin toiminallisuuksiin. Kirjautuneet käyttäjät ovat auktorisoituja lisäämään kappaleita omalle kappalelistallensa ja siirtämään listansa omalla spotify playlist:sä. Heillä on myös oikeus tarkastella ja päivittää omia tietoja sekä hakea ja tarkastella muiden käyttäjien tietoja. He eivät voi, kuitenkaan poistaa toisten käyttäjien tilejä tai muokata toisten käyttäjien tietoja.

## Kappaleiden haku

Kappaleiden haku sivulle pääsee painamalla ylänavigaatiossa olevaa Tracks-tekstiä. Ohjelman juuri polku vie myös tälle sivulle : https://favoritetracks.herokuapp.com. Kaikki kappaleet mitkä näkyvät hakutuloksessa ovat linkkejä ja jos haluat kuunnella, jonkin kappaleen niin paina hiiren oikealla kappaleen päällä ja valitse avaa välilehteen. 
<br/>
<br/>
<br/>
![](https://github.com/vkorppi/favoritetracks/blob/master/k%C3%A4ytt%C3%B6ohje/kuvat/V%C3%A4lilehteenPienempi.jpg)
<br/>
<br/>
Kun olet kirjautunut sovellukseen niin kappaleiden haku näyttää erilaiselta kuin mitä se oli ennen kirjautumista. Näkyvin muutos on se, että search-painikkeen viereen on ilmestynyt save-painike. Save-painikkeen painaminen avaa tyhjän valikon eteesi. Valikko on tyhjä, koska et ole vielä valinnut yhtäkään kappaletta hakutuloksista. Jotta save-painikkeesta olisi hyötyä niin ensin pitää hakea hakusanalla kappaleita.
<br/>
<br/>
<br/>
![](https://github.com/vkorppi/favoritetracks/blob/master/k%C3%A4ytt%C3%B6ohje/kuvat/Tyhj%C3%A4ValikkoPienennetty.jpg)
<br/>
<br/>
Tehdään haku hakusanalla dylan ja katsotaan, minkälaisia hakutuloksia saadaan. Hakutuloksista voidaan huomata, että jokaisen rivin kohdalle on ilmestynyt checkbox, näillä checkbox:lla merkitään, mitkä kappaleet halutaan lisätä omiin suosikkeihin. Valitaan vaikka kolme ensimmäistä hakutulosta ja painetaan save-painiketta, tällä kertaa valikossa näkyvät valitut kappaleet. Valitut kappaleet tallentuvat kappalelistaasi, kun painat save-painiketta. Tässä vaiheessa voit vielä peruuttaa tekemiäsi valintoja ottamalla ruksin pois kappaleen kohdalla, jolloin kappaletta ei tallenneta kappalelistaan. Kappelistaa pääsee tarkastelemaan ylänavigaation favorites-kohdasta.
<br/>
<br/>
<br/>
![](https://github.com/vkorppi/favoritetracks/blob/master/k%C3%A4ytt%C3%B6ohje/kuvat/SavePainikettaPainettuPienennetty.jpg)



## Kappalelista

Kappalelistalla näet listan tallentamistasi kappaleista, jos olet tallentanut kappaleita ja transfer-painikkeen. Jokaisen kappaleen vieressä on roskapöntön kuva, jota painamalla voit poistaa kyseisen kappaleen listaltasi. Kappaleiden alapuolelta löydät transfer-painikkeen, jolla voit siirtää kappalelistan omalle spotify-tilillesi. 
<br/>
<br/>
<br/>
![](https://github.com/vkorppi/favoritetracks/blob/master/k%C3%A4ytt%C3%B6ohje/kuvat/kappalelista.jpg)
<br/>
<br/>
Ennen, kuin yrität lisätä kappaleita Spotify-tilillesi sinulla pitää olla avoin istunto Spotify:n web versiossa. Jos, että ole vielä kirjautuneena Spotify:n niin mene Spotify:n sivulle (https://open.spotify.com/) kirjaudu ja palaa sitten takaisin toteuttamaan kappaleiden siirto. Kappaleiden siirto aloitetaan painamalla transfer-painiketta, jonka jälkeen eteesi ilmestyy ikkuna, johon sinun tulee syöttää playlistisi tunnus. Tunnuksen saa, jos mene Spotify:n web version sivustolle ja siellä omalle playlist-sivullesi. Playlistin tunnuksen saa sivun osoiteriviltä, jossa se tulee heti osan "playlist/" jälkeen esim. https://open.spotify.com/playlist/....tunnuksesi. 
<br/>
<br/>
<br/>
![](https://github.com/vkorppi/favoritetracks/blob/master/k%C3%A4ytt%C3%B6ohje/kuvat/transferPienennetty.jpg)
<br/>
<br/>

## Käyttäjienhallinta

Omiin tietoihiin pääsee käsiksi kohdasta Me ylänavigaatiossa. Kohdan paineminen avaa ikkunan, jossa näkyvät tietosi. Samassa ikkunassa näkyy painike-modify, jolla pääset muokkaamaan omia tietojasi. Päivitettävät tiedot tarkistatetaan, että ne täyttävät tietyt kriteerit esim. nimet pitää kirjoittaa isolla ja sähköpostiosoitteen pitää noudattaa tiettyä formaattia.
<br/>
<br/>
<br/>
![](https://github.com/vkorppi/favoritetracks/blob/master/k%C3%A4ytt%C3%B6ohje/kuvat/k%C3%A4ytt%C3%A4j%C3%A4N%C3%A4kym%C3%A4.jpg)
<br/>
<br/>
Kohdasta Users ylänavigaatiossa pääset sivulle, jossa voit hakea muita käyttäjiä toisen käyttäjän käyttäjätunnuksella, etunimellä tai sukunimellä. Voit myös tarkastella muitten käyttäjien tietoja painamalla
<br/>
<br/>
<br/>
![](https://github.com/vkorppi/favoritetracks/blob/master/k%C3%A4ytt%C3%B6ohje/kuvat/k%C3%A4ytt%C3%A4j%C3%A4N%C3%A4kym%C3%A4.jpg)
<br/>
<br/>

