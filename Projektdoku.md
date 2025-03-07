# Projekt-Dokumentation

Jan Frey

| Datum | Version | Zusammenfassung                                              |
| ----- | ------- | ------------------------------------------------------------ |
|  10.01.2025    | 0.0.0   | Start des Projektes - Informieren, Planen, Entscheiden. Doku erstellt. |
|17.01.2025|0.0.1|Lernen von Gsap und Windsurf|
|24.01.2025|0.1.0|Veröffentlichung erster Website mit Login page und vorübergehender Uploadfunktion|
|14.02.2025|0.1.1|Arbeit an Uploadfunktion|
|21.02.2025|0.1.2|Arbeit an Uploadfunktion und Bugfixes|
|28.02.2025|0.2.1|Arbeit an Uploadfunktion und Bugfixes|
|07.03.2024|1.0.0|Projekt abschliessen und veröffentlichen, Portfolio eintrag schreiben.|


## 1 Informieren

### 1.1 Ihr Projekt

Eine Web-Fotogalerie, mit Windsurf als IDE, GSAP, React und Tailwind als Framework. 

### 1.2 Meilensteine

| Meilenstein-Nr. | Beschreibung | geplantes Datum |
|------|----|-----|
| 1 |	Login-Page funktioniert  |  24.1.2025|
| 2 | Fotogalerie funktioniert |  21.2.2025 |
| 3| Projekt veröffentlichen   |   7.3.2025 |


### 1.3 User Stories

| US-№ | Verbindlichkeit | Typ             | Beschreibung                                                                                       |
|------|-----------------|-----------------|---------------------------------------------------------------------------------------------------|
| 1    | Muss            | Funktionalität  | Als Benutzer möchte ich mich registrieren, einloggen und ausloggen können, damit ich Zugriff auf meine Galerie habe. |
| 2    | Muss            | Funktionalität  | Als Benutzer möchte ich Fotos in meine Galerie hochladen können, damit ich sie speichern und verwalten kann. |
| 3    | Muss            | Funktionalität  | Als Benutzer möchte ich meine hochgeladenen Fotos in einer Galerie anzeigen können, um sie schnell ansehen zu können. |
| 4    | Muss            | Funktionalität  | Als Benutzer möchte ich Fotos löschen können, um unerwünschte oder alte Bilder zu entfernen.       |
| 5    | Soll            | Design          | Als Benutzer möchte ich eine benutzerfreundliche und ansprechende Oberfläche mit Animationen haben, um eine angenehme Nutzungserfahrung zu haben. |
| 6    | Kann            | Funktionalität  | Als Benutzer möchte ich meine Fotos nach Titel oder Datum durchsuchen und filtern können, um bestimmte Bilder leichter zu finden. |
| 7    | Kann            | Funktionalität  | Als Benutzer möchte ich Notizen oder Beschreibungen zu Fotos hinzufügen, um zusätzliche Informationen zu speichern. |
| 8    | Soll            | Sicherheit      | Als Benutzer möchte ich, dass meine Galerie nur für mich sichtbar ist, damit meine Privatsphäre geschützt wird. |
| 9    | Kann            | Funktionalität  | Als Benutzer möchte ich animierte Ladeprozesse sehen, während Bilder geladen oder hochgeladen werden, um die Wartezeit verständlicher zu machen. |
| 10   | Soll            | Funktionalität  | Als Entwickler möchte ich das Projekt auf Netlify und Firebase hosten, um eine zuverlässige Plattform für Frontend und Backend zu gewährleisten. |





### 1.4 Testfälle



| TC-№ | Ausgangslage                                      | Eingabe                             | Erwartete Ausgabe                                                                                       |
|------|---------------------------------------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------|
| 1    | Benutzer öffnet die Login-Seite.                 | Korrekte Anmeldedaten eingeben.     | Benutzer wird erfolgreich eingeloggt und zur Galerie weitergeleitet.                                     |
| 2    | Benutzer öffnet die Login-Seite.                 | Falsche Anmeldedaten eingeben.      | Fehlermeldung „Ungültige Anmeldedaten“ wird angezeigt.                                                   |
| 3    | Benutzer ist eingeloggt und sieht die Galerie.   | Ein Foto hochladen.                 | Foto wird erfolgreich in der Galerie angezeigt und in Firebase gespeichert.                             |
| 4    | Benutzer hat Fotos in der Galerie.               | Auf „Löschen“ für ein Foto klicken. | Foto wird erfolgreich aus der Galerie entfernt und aus Firebase gelöscht.                                |
| 5    | Galerie-Seite wird geöffnet.                     | Keine Aktion.                       | Alle hochgeladenen Fotos werden korrekt in einer Gitteransicht dargestellt.                              |
| 6    | Benutzer hat keine Fotos in der Galerie.         | Galerie-Seite öffnen.               | Nachricht „Keine Fotos vorhanden“ wird angezeigt.                                                       |
| 7    | Benutzer lädt ein Foto hoch.                     | Während des Uploads.                | Ein Lade-Animation wird angezeigt, bis das Foto erfolgreich hochgeladen wurde.                           |
| 8    | Benutzer möchte ein Foto beschreiben.            | Eine Beschreibung eingeben.         | Beschreibung wird erfolgreich gespeichert und unter dem Foto angezeigt.                                  |
| 9    | Benutzer durchsucht die Galerie.                 | Suchbegriff eingeben.               | Fotos, die zum Suchbegriff passen, werden korrekt gefiltert angezeigt.                                   |
| 10   | Benutzer meldet sich ab.                         | Auf „Logout“ klicken.               | Benutzer wird ausgeloggt und zur Login-Seite weitergeleitet.                                             |
| 11   | App ist bereit für Deployment.                   | App auf Netlify und Firebase hosten. | Frontend und Backend sind erfolgreich gehostet und öffentlich zugänglich.                                |
| 12   | Benutzer lädt Seite in einem mobilen Browser.    | Keine Aktion.                       | Die Galerie und alle Funktionen werden korrekt auf kleineren Bildschirmen dargestellt.                   |



## 2. Planen

| AP-№ | Frist     | Zuständig       | Beschreibung       | Geplante Zeit in Stunden |
|------|-----------|-----------------|-------------------|-------------------------------|
|1.1|17.01|Jan Frey|In Windsurf einarbeiten |2|
|1.2|17.01|Jan|In GSAP einarbeiten|3|
|2.1|24.01|Jan|Login Page layout und design|2|
|2.2|24.01|Jan|Login Page funktioniert|2|
|2.3|24.01|Jan|Login Page mit Backend verbinden|1|
|3.1|21.02|Jan|Fotos können geposted werden|5|
|3.2|28.02|Jan|Fotos können angezeigt werden.|5|
|4.1|07.03|Jan|Projekt veröffentlichen|1|
|5.1|07.03|Jan|Portfolioeintrag schreiben|4|


Total: 20 Stunden

## 3 Entscheiden

---

## **Technologien**
1. **React (Frontend)**
   - **Warum gewählt?** React ist eine bewährte JavaScript-Bibliothek, die durch ihre Wiederverwendbarkeit von Komponenten und schnelle Entwicklung ideal für dynamische Webanwendungen ist. Es ermöglicht effizientes State-Management, was für die interaktive Foto-Gallery unerlässlich ist.
   - **Alternative geprüft?** Angular oder Vue.js. React wurde bevorzugt, da ich bereits Erfahrung damit habe und es eine große Community für Unterstützung gibt.

2. **TailwindCSS (Styling)**
   - **Warum gewählt?** TailwindCSS bietet ein Utility-first-Ansatz, mit dem man schnell und flexibel responsives Design erstellen kann. Es reduziert die Notwendigkeit, benutzerdefiniertes CSS zu schreiben.
   - **Alternative geprüft?** Bootstrap oder Material-UI. Tailwind wurde bevorzugt, da es eine leichtere Kontrolle über das Design ermöglicht.

3. **GSAP (Animationen)**
   - **Warum gewählt?** GSAP bietet performante, umfangreiche und einfach zu implementierende Animationen. Es ist ideal, um eine interaktive und visuell ansprechende Benutzererfahrung zu schaffen.
   - **Alternative geprüft?** CSS-Animationen oder Framer Motion. GSAP wurde gewählt, da es präzisere Animationen und bessere Performance ermöglicht.

4. **Firebase (Backend)**
   - **Warum gewählt?** Firebase ist eine All-in-One-Plattform, die Authentication, Firestore (Datenbank) und Storage (für Fotos) bereitstellt. Es ist leicht zu implementieren und skaliert automatisch.
   - **Alternative geprüft?** Supabase oder ein selbst gehostetes Backend. Firebase wurde bevorzugt, da es die Komplexität und den Wartungsaufwand reduziert.

---

## **Plattform**
- **Webapp**
   - **Warum gewählt?** Eine Webapp ist plattformunabhängig und über jeden Browser zugänglich. Benutzer benötigen keine zusätzliche Software, was die Barriere für die Nutzung senkt.
   - **Alternative geprüft?** Native App. Die Webapp wurde bevorzugt, da sie leichter zu entwickeln und zu warten ist und eine größere Zielgruppe erreicht.

---

## **Methodik**
- **IPERKA**
   - **Warum gewählt?** Die Methode IPERKA bietet eine klare Struktur für die Projektplanung und -durchführung. Sie eignet sich besonders gut für schulische Projekte und kleinere Teams.

---

## **Versionskontrolle**
- **GitHub**
   - **Warum gewählt?** GitHub bietet eine zuverlässige Plattform für Versionskontrolle, Zusammenarbeit und Integration mit CI/CD-Tools wie Netlify. Es ermöglicht, Änderungen effizient nachzuverfolgen.
   - **Alternative geprüft?** GitLab oder Bitbucket. GitHub wurde bevorzugt, da es weit verbreitet und einfach in der Nutzung ist.

---

## **Hosting**
1. **Frontend: Netlify**
   - **Warum gewählt?** Netlify bietet einfache CI/CD-Integration mit GitHub, schnelle Ladezeiten und kostenlose Hosting-Möglichkeiten für kleine Projekte. Es ist besonders für React-Anwendungen optimiert.
   - **Alternative geprüft?** Vercel. Netlify wurde bevorzugt, da es sich nahtlos mit Firebase kombinieren lässt.

2. **Backend: Firebase**
   - **Warum gewählt?** Firebase stellt eine serverlose Infrastruktur bereit, die Authentication, Storage und Datenbankdienste umfasst. Es reduziert den Verwaltungsaufwand erheblich.
   - **Alternative geprüft?** Supabase oder ein selbst gehosteter Server. Firebase wurde gewählt, da es speziell für Projekte mit geringem Backend-Aufwand geeignet ist.

---

### 4. Realisieren

| AP-№ | Datum   | Zuständig               | Geplante Zeit | Tatsächliche Zeit |
|------|---------|-------------------------|---------------|-------------------|
| |   |                |     |         |


## 5 Kontrollieren

### 5.1 Testprotokoll


| TC-№ | Datum       | Resultat | Tester         |
|------|-------------|----------|----------------|
| |  |      |  |






