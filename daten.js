"use strict";
/* Inhalte des KI-Fuehrerscheins */
const BEREICHE = [
  "KI verstehen und prüfen",
  "KI sicher und effektiv nutzen",
  "KI beim Lernen und Arbeiten",
  "KI, Gesellschaft und Verantwortung"
];

const REGELN = [
  { zeichen: "stopp", t: "Erst denken, dann prompten", s: "Was will ich selbst lernen? Was soll die KI übernehmen?" },
  { zeichen: "vorfahrt", t: "Prüfen hat Vorfahrt", s: "KI kann sich irren. Ich prüfe, bevor ich etwas übernehme." },
  { zeichen: "verbot", t: "Keine persönlichen Daten", s: "Namen, Adressen, Fotos und Noten bleiben draußen – meine und die von anderen." },
  { zeichen: "blinker", t: "Blinker setzen", s: "Ich sage, wobei mir KI geholfen hat." },
  { zeichen: "steuer", t: "Ich sitze am Steuer", s: "Für das Ergebnis bin ich verantwortlich, nicht die KI." }
];

const KLASSEN = [
{
  id: "A", stufe: "Klasse 5/6", titel: "Entdecken", emoji: "🚲", spitz: "Fahrrad",
  motto: "Du findest heraus, wo KI in deinem Alltag steckt, wie sie lernt und warum sie sich irren kann.",
  kann: [
    ["Beispiele für KI in meinem Alltag nennen.", "erklären, dass eine KI aus sehr vielen Beispielen (Trainingsdaten) lernt.", "die Wörter Prompt, Trainingsdaten und Halluzination mit eigenen Worten erklären.", "erklären, warum derselbe Prompt verschiedene Antworten liefern kann."],
    ["einer KI einen klaren Auftrag geben.", "sagen, welche Angaben über mich und andere nicht in eine KI gehören."],
    ["mit einem Assistenten in schulKI einen Lernplan aufstellen.", "einen eigenen Text mit KI-Hinweisen verbessern und selbst entscheiden, was ich übernehme."],
    ["sagen, für wen ein KI-Angebot gedacht ist (Altersgrenzen).", "Bescheid geben, wenn mir eine KI-Antwort seltsam oder unangenehm vorkommt."]
  ],
  fahrstunden: [
    { b: 0, t: "Was ist künstliche Intelligenz?", d: "15 min", x: "Schau dir die Sachgeschichte der „Sendung mit der Maus“ an: Wie schreibt eine KI Texte? Notiere danach in zwei Sätzen, warum eine KI „mehr zählt, als sie schreibt“.", url: "https://www.wdrmaus.de/filme/sachgeschichten/kuenstliche_intelligenz.php5", ut: "Maus-Video" },
    { b: 0, t: "Die KI rät deine Zeichnung", d: "15 min", x: "Zeichne sechs Begriffe. Sieh dir danach an, mit welchen Zeichnungen die KI deine verglichen hat. Warum erkennt sie manche nicht?", url: "https://quickdraw.withgoogle.com/", ut: "Quick, Draw!" },
    { b: 0, t: "Schlag das Krokodil", d: "20 min", x: "Spiele Mini-Schach gegen einen Computer, der am Anfang nichts kann. Nach jedem Spiel wird er belohnt oder bestraft. Ab wann gewinnst du nicht mehr?", url: "https://www.stefanseegerer.de/schlag-das-krokodil/", ut: "Schlag das Krokodil" },
    { b: 0, o: "mit schulKI", t: "Ein Prompt, drei Antworten", d: "15 min", x: "Stellt in schulKI dreimal dieselbe Frage. Vergleicht die Antworten Wort für Wort. Was bleibt gleich, was ändert sich?" },
    { b: 2, o: "mit schulKI", t: "Mein Lernplan", d: "25 min", x: "Lass dir vom Assistenten „Mein Lernplan“ helfen, die Woche vor einer Klassenarbeit zu planen. Streiche, was für dich nicht passt." },
    { b: 2, o: "mit schulKI", t: "Texte überarbeiten", d: "25 min", x: "Schreibe erst selbst. Lass dir dann drei Hinweise zu deinem Text geben und setze die um, die du gut findest." }
  ],
  spiele: [
    { typ: "sortieren", t: "KI oder keine KI?", intro: "Steckt in diesem Gerät oder Programm etwas, das aus Beispielen gelernt hat?",
      kat: ["KI", "keine KI"],
      karten: [
        ["Sprachassistent, der gesprochene Fragen versteht", 0, "Spracherkennung wurde mit sehr vielen Sprachaufnahmen trainiert."],
        ["Taschenrechner", 1, "Er rechnet nach festen Regeln und lernt nichts dazu."],
        ["Handy, das sich mit deinem Gesicht entsperrt", 0, "Gesichtserkennung hat aus vielen Bildern gelernt."],
        ["Lichtschalter", 1, "An oder aus – hier wird nichts gelernt."],
        ["Videovorschläge „Das könnte dir gefallen“", 0, "Das Empfehlungssystem lernt aus dem, was du und andere ansehen."],
        ["Wecker", 1, "Er klingelt zur eingestellten Zeit, mehr nicht."],
        ["Übersetzer-App", 0, "Übersetzungsprogramme wurden mit Millionen übersetzter Sätze trainiert."],
        ["Ampel mit festem Zeitplan", 1, "Sie schaltet nach einer festen Regel."],
        ["Chatbot, der Geschichten schreibt", 0, "Ein Sprachmodell hat aus sehr vielen Texten gelernt, wie Sätze weitergehen."],
        ["Navi, das Stau vorhersagt", 0, "Es lernt aus den Fahrdaten vieler Autos, wann es wo eng wird."]
      ] }
  ],
  quiz: [
    { f: "Was ist ein Prompt?", a: ["Die Eingabe, mit der ich einer KI einen Auftrag gebe", "Ein besonders schneller Computer", "Die Antwort der KI", "Ein Programm gegen Viren"], e: "Der Prompt ist dein Auftrag an die KI. Je klarer er ist, desto besser passt die Antwort." },
    { f: "Woraus lernt eine KI?", a: ["Aus sehr vielen Beispielen, den Trainingsdaten", "Aus eigenen Erlebnissen wie ein Mensch", "Sie muss nichts lernen, sie weiß alles", "Nur aus dem, was ich ihr heute schreibe"], e: "Eine KI erkennt Muster in riesigen Mengen von Beispielen. Was dort fehlt oder falsch ist, fehlt ihr auch." },
    { f: "Du stellst zweimal genau dieselbe Frage und bekommst zwei verschiedene Antworten. Woran liegt das?", a: ["Die KI wählt ihre Wörter nach Wahrscheinlichkeit, dabei spielt Zufall mit", "Die KI ist kaputt", "Eine der Antworten muss gelogen sein", "Die KI hat sich über die Wiederholung geärgert"], e: "Ein Sprachmodell berechnet, welche Wörter wahrscheinlich passen, und würfelt ein wenig. Deshalb fallen Antworten verschieden aus." },
    { f: "Was bedeutet es, wenn eine KI „halluziniert“?", a: ["Sie erfindet etwas, das überzeugend klingt, aber nicht stimmt", "Sie antwortet besonders langsam", "Sie zeigt bunte Bilder", "Sie weigert sich zu antworten"], e: "Eine KI prüft nicht, ob etwas wahr ist. Sie schreibt, was gut klingt – manchmal ist das frei erfunden." },
    { f: "Was gehört nicht in einen KI-Chat?", a: ["Mein voller Name, meine Adresse und Fotos von Mitschülern", "Eine Frage zu den Planeten", "Ein Gedicht, das ich selbst geschrieben habe", "Die Bitte um einen Tipp für Vokabeln"], e: "Persönliche Daten bleiben draußen – deine eigenen und erst recht die von anderen." },
    { f: "Die KI erkennt deine gezeichnete Katze nicht. Was ist die beste Erklärung?", a: ["Meine Zeichnung sieht anders aus als die Katzen, mit denen sie trainiert wurde", "Die KI mag keine Katzen", "Katzen kann man grundsätzlich nicht zeichnen", "Die KI hat gerade Pause"], e: "Die KI vergleicht mit ihren Trainingsbeispielen. Was davon stark abweicht, erkennt sie schlecht." }
  ],
  praxis: { t: "Ein Prompt, drei Antworten", x: "Stelle in schulKI dreimal dieselbe Sachfrage aus dem Unterricht. Markiere die Unterschiede zwischen den Antworten. Prüfe eine Aussage im Schulbuch oder Lexikon nach. Stelle dein Ergebnis in einer Minute vor.", n: "Drei Antworten mit Markierungen und die geprüfte Aussage mit Quelle" }
},
{
  id: "B", stufe: "Klasse 7/8", titel: "Prüfen und anwenden", emoji: "🛵", spitz: "Moped",
  motto: "Du findest Fehler in KI-Antworten, erkennst Fälschungen und nutzt KI als Übungspartner.",
  kann: [
    ["Fehler in einem KI-Text finden und mit einer Quelle belegen.", "KI in Alltagsgeräten, in Werbung und in Falschmeldungen erkennen.", "beschreiben, welche Daten ein KI-Dienst über mich speichern kann.", "erklären, warum eine KI Vorurteile aus ihren Trainingsdaten übernimmt."],
    ["einen Prompt aus Rolle, Aufgabe, Kontext und Format aufbauen.", "Grundregeln zu Urheberrecht und Recht am eigenen Bild auf KI-Inhalte anwenden.", "Stärken und Schwächen verschiedener KI-Werkzeuge nennen."],
    ["KI als Gesprächspartner in einer Fremdsprache oder zu einem Fachthema nutzen.", "mir passende Übungsaufgaben erstellen lassen.", "eigene Lösungen mit KI überprüfen, statt Lösungen abzuschreiben.", "angeben, wobei mir KI geholfen hat."],
    ["in einer Diskussion die Sicht einer Gruppe vertreten (z. B. Jugendliche, Eltern, Entwickler, Umweltverband).", "Folgen von KI für Umwelt und Arbeitswelt an Beispielen beschreiben."]
  ],
  fahrstunden: [
    { b: 0, t: "Deepfake Detectives", d: "20 min", x: "Echt oder von einer KI erzeugt? Entscheide Bild für Bild und lies die Erklärungen. Notiere drei Merkmale, an denen du Fälschungen erkennst.", url: "https://www.klicksafe.de/materialien/quiz-deepfake-detectives", ut: "klicksafe-Quiz" },
    { b: 0, t: "Trainiere deine eigene KI", d: "30 min", x: "Bringe einer KI bei, zwei Gegenstände zu unterscheiden. Teste sie dann mit einem Gegenstand, den sie nie gesehen hat. Braucht eine Kamera.", url: "https://teachablemachine.withgoogle.com/", ut: "Teachable Machine" },
    { b: 0, t: "Die Fake-News-Fabrik", d: "25 min", x: "Schlüpfe in die Rolle von jemandem, der Falschmeldungen verbreitet. Welche Tricks benutzt das Spiel? Woran erkennst du sie künftig?", url: "https://www.getbadnews.de/", ut: "Bad News" },
    { b: 1, o: "mit schulKI", t: "Prompt-Werkstatt", d: "20 min", x: "Nimm einen schwachen Prompt („Erkläre Prozentrechnung“) und ergänze nacheinander Rolle, Kontext und Format. Vergleiche die Antworten." },
    { b: 1, o: "mit schulKI", t: "Der wörtliche Roboter", d: "20 min", x: "Schreibe dem Assistenten eine Anleitung, wie man ein Brot schmiert. Er führt sie wortwörtlich aus. Verbessere sie, bis nichts mehr schiefgeht: eindeutig, vollständig, ausführbar." },
    { b: 2, o: "mit schulKI", t: "Sprachpartner", d: "20 min", x: "Führe mit einem Assistenten in schulKI ein kurzes Gespräch in der Fremdsprache, zum Beispiel beim Bäcker. Lass dir am Ende zwei Fehler erklären." },
    { b: 2, o: "mit schulKI", t: "Übungen nach Maß", d: "20 min", x: "Lass dir fünf Aufgaben zu einem Thema erstellen, das du üben möchtest. Löse sie erst allein, lass dann prüfen." },
    { b: 3, o: "in der Gruppe", t: "Podium: KI und wir", d: "Projekttag", x: "Jede Gruppe erstellt einen Steckbrief für ihre Rolle (Jugendliche, Eltern, Arbeitgeber, Entwickler, Politik, Umweltorganisation) und vertritt sie auf dem Podium." }
  ],
  spiele: [
    { typ: "sortieren", t: "Prompt-Werkstatt: Welcher Baustein ist das?", intro: "Ein guter Prompt hat vier Bausteine. Ordne jeden Satz zu.",
      kat: ["Rolle", "Aufgabe", "Kontext", "Format"],
      karten: [
        ["„Du bist eine geduldige Mathe-Nachhilfelehrerin.“", 0, "Die Rolle legt fest, als wer die KI antworten soll."],
        ["„Erstelle mir fünf Übungsaufgaben zur Prozentrechnung.“", 1, "Die Aufgabe sagt, was getan werden soll."],
        ["„Ich bin in Klasse 7. Zinsrechnung hatten wir noch nicht.“", 2, "Der Kontext beschreibt die Lage: für wen, auf welchem Stand, wozu."],
        ["„Gib eine nummerierte Liste aus, die Lösungen erst ganz am Ende.“", 3, "Das Format bestimmt, wie die Antwort aussehen soll."],
        ["„Antworte als Reiseführer in London.“", 0, "Wieder eine Rolle."],
        ["„Ich übe für ein Gespräch im Englischunterricht und kenne etwa 800 Wörter.“", 2, "Das ist Kontext: Wozu und auf welchem Niveau."],
        ["„Stelle mir immer nur eine Frage und warte auf meine Antwort.“", 3, "Auch der Ablauf des Gesprächs gehört zum Format."],
        ["„Frage mich, was ich in London ansehen möchte.“", 1, "Das ist der eigentliche Auftrag."]
      ] },
    { typ: "sortieren", t: "Ampel: Darf das in den Chat?", intro: "Entscheide wie an der Ampel: Darf diese Eingabe in eine KI?",
      kat: ["🟢 in Ordnung", "🔴 bleibt draußen"],
      karten: [
        ["„Erkläre mir den Unterschied zwischen Wetter und Klima.“", 0, "Eine Sachfrage ohne persönliche Daten."],
        ["Ein Foto der Klassenliste mit Namen und Geburtstagen", 1, "Das sind persönliche Daten von anderen. Die darfst du nicht weitergeben."],
        ["Mein selbst geschriebener Aufsatz ohne Namen", 0, "Dein eigener Text ohne Namen ist in Ordnung."],
        ["„Mein Freund (voller Name) hat diese Krankheit. Was hat er?“", 1, "Gesundheitsdaten und Namen anderer Menschen gehören nie in eine KI."],
        ["Das Passwort für mein Schulkonto, damit die KI etwas nachsieht", 1, "Passwörter gibst du niemandem – auch keiner KI."],
        ["„Frag mich Vokabeln der Lektion 3 ab.“", 0, "Üben ohne persönliche Angaben ist in Ordnung."],
        ["Ein Foto einer Mitschülerin mit der Bitte „Mach daraus ein lustiges Bild“", 1, "Ohne ihre Erlaubnis verletzt das ihr Recht am eigenen Bild."],
        ["Meine Adresse und Telefonnummer für einen „persönlichen“ Lernplan", 1, "Für einen Lernplan braucht die KI weder Adresse noch Telefonnummer."]
      ] }
  ],
  quiz: [
    { f: "Welche vier Bausteine machen einen Prompt stark?", a: ["Rolle, Aufgabe, Kontext, Format", "Anrede, Gruß, Datum, Unterschrift", "Frage, Antwort, Lob, Dank", "Titel, Bild, Farbe, Schrift"], e: "Rolle (als wer?), Aufgabe (was?), Kontext (für wen, wozu?), Format (wie soll die Antwort aussehen?)." },
    { f: "Eine KI nennt dir eine Jahreszahl für dein Referat. Was tust du?", a: ["Ich prüfe sie in einer zweiten, verlässlichen Quelle", "Ich übernehme sie, KI rechnet ja genau", "Ich frage dieselbe KI noch einmal, das reicht", "Ich lasse die Zahl weg, KI liegt immer falsch"], e: "KI-Antworten können falsch sein. Verlässlich wird eine Angabe erst, wenn eine unabhängige Quelle sie bestätigt." },
    { f: "Was ist ein Deepfake?", a: ["Ein mit KI erzeugtes oder verändertes Bild, Video oder Audio, das echt wirkt", "Ein besonders tiefes Tauchvideo", "Ein Computervirus", "Ein Foto mit schlechter Qualität"], e: "Deepfakes können Menschen Dinge sagen oder tun lassen, die nie passiert sind." },
    { f: "Du lässt ein Foto eines Mitschülers von einer KI verändern und postest es. Was ist das Problem?", a: ["Ich verletze sein Recht am eigenen Bild, wenn er nicht zugestimmt hat", "Keins, das Bild ist ja jetzt von der KI", "Nur die KI-Firma kann Ärger bekommen", "Das ist erst ab 18 verboten"], e: "Jeder Mensch entscheidet selbst, welche Bilder von ihm veröffentlicht werden – auch bei bearbeiteten Bildern." },
    { f: "Warum schlägt dir eine Videoplattform immer ähnliche Videos vor?", a: ["Ein Empfehlungssystem lernt aus dem, was ich ansehe", "Weil es nur diese Videos gibt", "Weil meine Lehrer das so eingestellt haben", "Reiner Zufall"], e: "Empfehlungssysteme sind KI. Sie lernen aus deinem Verhalten – und zeigen dir dadurch nur einen Ausschnitt." },
    { f: "Eine KI hat dir bei einer Hausaufgabe geholfen. Was ist fair?", a: ["Ich gebe an, wobei sie mir geholfen hat", "Ich sage nichts, merkt ja keiner", "Ich schreibe „von KI“ darunter und bin nicht mehr verantwortlich", "Ich lösche den Chat"], e: "Blinker setzen: Sag, wobei KI geholfen hat. Verantwortlich für das Ergebnis bleibst du." }
  ],
  praxis: { t: "Fehlerjagd", x: "Lass dir in schulKI einen kurzen Sachtext zu einem Unterrichtsthema schreiben. Finde zwei Stellen, die falsch oder ungenau sind, und belege das jeweils mit einer Quelle. Verbessere danach deinen Prompt mit den vier Bausteinen.", n: "KI-Text mit zwei belegten Korrekturen und der verbesserte Prompt" }
},
{
  id: "C", stufe: "Klasse 9/10", titel: "Durchblicken", emoji: "🚗", spitz: "Auto",
  motto: "Du verstehst, wie KI lernt und Texte erzeugt, und entscheidest selbst, wann sie dir hilft.",
  kann: [
    ["überwachtes, unüberwachtes und bestärkendes Lernen an Beispielen unterscheiden.", "erklären, wie ein Sprachmodell Text erzeugt und warum es Falsches behaupten kann.", "mit Trainings- und Testdaten beurteilen, wie gut ein Modell ist.", "Ursachen für Verzerrungen (Bias) in KI-Entscheidungen erklären."],
    ["Prompts Schritt für Schritt verbessern (Beispiele geben, Zwischenschritte verlangen, Rückfragen zulassen).", "begründen, welche Daten nie in eine KI gehören.", "Rechte und Pflichten bei KI-Texten und KI-Bildern nennen.", "die Grundidee der europäischen KI-Verordnung erklären."],
    ["lernförderliche von lernhinderlicher KI-Nutzung unterscheiden.", "beurteilen, welche Aufgaben sich für KI eignen und welche nicht.", "KI-Ergebnisse und angegebene Quellen prüfen."],
    ["Chancen und Gefahren von KI für die Gesellschaft abwägen (z. B. Energieverbrauch, Arbeit, Beziehungen).", "zu einem ethischen Problem begründet Stellung nehmen."]
  ],
  fahrstunden: [
    { b: 0, t: "Beißt der Affe?", d: "20 min", x: "Finde Regeln, mit denen sich beißende von harmlosen Affen unterscheiden lassen, und baue daraus einen Entscheidungsbaum. Teste ihn mit neuen Affen.", url: "https://www.stefanseegerer.de/decision-tree-monkey-game/", ut: "Affenspiel" },
    { b: 0, t: "Ein Sprachmodell von innen", d: "30 min", x: "Lade die Märchen-Sammlung und beginne mit „Es war einmal“. Verändere die Temperatur. Schalte dann in den manuellen Modus und wähle die Wörter selbst.", url: "https://www.soekia.ch/gpt.html", ut: "SoekiaGPT" },
    { b: 0, t: "ELIZA trifft Chatbot", d: "20 min", x: "Unterhalte dich mit ELIZA von 1966. Finde heraus, nach welchen Regeln sie antwortet. Worin unterscheidet sie sich von einem heutigen Sprachmodell?", url: "https://www.masswerk.at/eliza/", ut: "ELIZA" },
    { b: 0, o: "ohne Computer", t: "Der Bewerbungsfilter", d: "25 min", x: "Eine Firma trainiert eine KI mit ihren Einstellungen der letzten zehn Jahre – fast nur Männer. Erkläre, was passiert, und warum es nicht reicht, das Geschlecht aus den Daten zu löschen." },
    { b: 2, o: "mit schulKI", t: "Fünf Prüffragen", d: "20 min", x: "Prüfe eine KI-Antwort aus einem Fach mit fünf Fragen: Verstehe ich es? Stimmt es? Gibt es die Quelle? Ist es aktuell? Ist es einseitig? Notiere zu jeder Frage, wie du es herausgefunden hast." },
    { b: 2, o: "in der Gruppe", t: "Hilft das oder hindert das?", d: "20 min", x: "Sammelt zehn Arten, KI für die Schule zu nutzen. Ordnet sie auf einer Linie von „macht mich besser“ bis „macht mich schlechter“ und begründet." },
    { b: 3, t: "Moral Machine", d: "25 min", x: "Ein selbstfahrendes Auto kann nicht mehr bremsen. Entscheide in 13 Situationen und vergleiche dein Ergebnis mit anderen. Wer sollte solche Regeln festlegen?", url: "https://www.moralmachine.net/hl/de", ut: "Moral Machine" }
  ],
  spiele: [
    { typ: "sprachmodell", t: "Sei das Sprachmodell", intro: "Ein Sprachmodell berechnet für jede Lücke, welche Fortsetzung wie wahrscheinlich ist, und würfelt dann. Mit der Temperatur stellst du ein, wie mutig gewürfelt wird.",
      teile: [
        { vor: "Am Morgen rollte der Roboter in die", w: [["Schule", 55], ["Küche", 25], ["Werkstatt", 15], ["Mondrakete", 5]] },
        { vor: " und suchte dort", w: [["seinen Freund", 50], ["ein Ladekabel", 30], ["das Frühstück", 15], ["einen singenden Kaktus", 5]] },
        { vor: ". Danach war er", w: [["zufrieden", 60], ["müde", 25], ["verwirrt", 10], ["plötzlich Bürgermeister", 5]] }
      ], ende: "." },
    { typ: "detektor", t: "Halluzinations-Detektor", intro: "Eine KI sollte etwas über Dresden schreiben. Drei Sätze enthalten Erfundenes. Tippe sie an.",
      saetze: [
        ["Dresden ist die Landeshauptstadt von Sachsen.", false, ""],
        ["Durch die Stadt fließt die Elbe, die bei Cuxhaven in die Ostsee mündet.", true, "Die Elbe mündet in die Nordsee."],
        ["Die Frauenkirche wurde im Zweiten Weltkrieg zerstört und 2005 wieder geweiht.", false, ""],
        ["Mit rund 1,8 Millionen Einwohnern ist Dresden die zweitgrößte Stadt Deutschlands.", true, "Dresden hat knapp 600 000 Einwohner; die zweitgrößte Stadt ist Hamburg."],
        ["Der Zwinger ist ein bekanntes Bauwerk des Barock.", false, ""],
        ["Laut einer Studie der Universität Pieschen von 2021 kommen jedes Jahr 40 Millionen Touristen allein wegen des Zwingers.", true, "Eine Universität Pieschen gibt es nicht – Quelle und Zahl sind erfunden."]
      ] }
  ],
  quiz: [
    { f: "Wie erzeugt ein Sprachmodell einen Text?", a: ["Es berechnet immer wieder, welches Token wahrscheinlich als nächstes folgt", "Es schlägt die Antwort in einer Datenbank mit geprüften Fakten nach", "Es versteht die Frage wie ein Mensch und überlegt sich die Antwort", "Es kopiert ganze Absätze von Webseiten"], e: "Ein Sprachmodell setzt Text Stück für Stück nach Wahrscheinlichkeiten fort. Ob der Inhalt stimmt, prüft es dabei nicht." },
    { f: "Ein Modell erreicht 100 % auf den Trainingsdaten, aber nur 55 % auf den Testdaten. Wie heißt das?", a: ["Überanpassung (Overfitting)", "Halluzination", "Bestärkendes Lernen", "Clustering"], e: "Das Modell hat die Trainingsbeispiele auswendig gelernt und kommt mit neuen Fällen schlecht zurecht." },
    { f: "Eine Bewerbungs-KI wurde mit den Einstellungen der letzten zehn Jahre trainiert, fast nur Männer. Jetzt bevorzugt sie Männer. Warum?", a: ["Sie übernimmt die Verzerrung aus ihren Trainingsdaten", "Sie wurde absichtlich so programmiert", "Männer schreiben bessere Bewerbungen", "Das ist ein zufälliger Fehler, der wieder verschwindet"], e: "Bias: Die KI lernt die Muster aus den Daten – auch die ungerechten – und kann sie sogar verstärken." },
    { f: "Ein Onlineshop lässt seine Kunden von einer KI in Gruppen einteilen, ohne Gruppen vorzugeben. Welche Lernart ist das?", a: ["Unüberwachtes Lernen", "Überwachtes Lernen", "Bestärkendes Lernen", "Gar kein maschinelles Lernen"], e: "Ohne vorgegebene Beschriftungen sucht das Verfahren selbst nach Gruppen (Clustern)." },
    { f: "Was ist die Grundidee der europäischen KI-Verordnung (AI Act)?", a: ["Je höher das Risiko einer KI-Anwendung, desto strenger die Regeln", "KI ist in der EU für alle unter 18 verboten", "Jede KI muss in Europa entwickelt worden sein", "KI-Firmen dürfen alles, solange es kostenlos ist"], e: "Die Verordnung ordnet Anwendungen nach Risiko: manches ist verboten, für Riskantes gelten strenge Pflichten, und KI-erzeugte Inhalte wie Deepfakes müssen erkennbar sein." },
    { f: "Welche Nutzung hilft dir beim Lernen am meisten?", a: ["Erst selbst lösen, dann von der KI Rückmeldung holen", "Die Lösung erzeugen lassen und abschreiben", "Zusammenfassungen kopieren, ohne den Text zu lesen", "Die KI entscheiden lassen, was wichtig ist"], e: "Lernen passiert beim eigenen Nachdenken. KI hilft, wenn sie dich prüft, Tipps gibt oder Rückmeldung liefert – nicht, wenn sie dir das Denken abnimmt." }
  ],
  praxis: { t: "Prompt-Protokoll", x: "Bearbeite eine Aufgabe aus einem Fach deiner Wahl mit KI in mindestens drei Prompt-Schritten. Prüfe das Ergebnis an zwei Stellen mit unabhängigen Quellen. Beschreibe in fünf Sätzen, wo dir die KI geholfen und wo sie dich behindert hat.", n: "Chatverlauf, zwei Prüfungen mit Quelle und die Reflexion" }
},
{
  id: "D", stufe: "Klasse 11/12", titel: "Mitgestalten", emoji: "🧑‍🏫", spitz: "Fahrlehrerschein",
  motto: "Du baust eigene Lernassistenten, arbeitest wissenschaftlich sauber mit KI und redest bei den Regeln mit.",
  kann: [
    ["in Grundzügen erklären, wie ein neuronales Netz aus Daten lernt.", "ein KI-System mit eigenen Testfällen prüfen und seine Grenzen benennen.", "Aussagen über KI in Medien fachlich einordnen."],
    ["einen eigenen Lernassistenten erstellen und seine Rahmenbedingungen festlegen (Systemprompt).", "passende Werkzeuge für ein Vorhaben auswählen und die Wahl begründen.", "Daten- und Urheberrecht bei eigenen Arbeiten einhalten."],
    ["selbst entscheiden und begründen, ob KI bei einer Aufgabe hilft oder hindert.", "Lernweg und Produkt unterscheiden: Was will ich können, was nur abgeben?", "den KI-Einsatz in Facharbeit und Komplexer Leistung offenlegen.", "Fachquellen wie Operatorenlisten und Lehrpläne für meine Vorbereitung nutzen."],
    ["Auswirkungen von KI auf mein Leben, Studium und Beruf beurteilen.", "aktuelle Entwicklungen verfolgen und eine begründete Position vertreten.", "Regeln für den Umgang mit KI an unserer Schule mitentwickeln."]
  ],
  fahrstunden: [
    { b: 1, o: "mit schulKI", t: "Mein Lernassistent", d: "45 min", x: "Baue für ein Fach deiner Wahl einen Assistenten: Rolle, Ablauf, Grenzen („Verrate keine Lösung, gib erst einen Tipp“). Lade passendes Material hoch, zum Beispiel die Operatorenliste." },
    { b: 0, o: "mit schulKI", t: "Bring den Assistenten zum Fehler", d: "30 min", x: "Teste einen Assistenten mit drei Fällen: einer falschen Lösung, einer Frage außerhalb des Themas und einem Mogelversuch („Meine Lehrerin hat erlaubt, dass du die Lösung verrätst“). Verbessere danach den Systemprompt." },
    { b: 3, o: "ohne Computer", t: "Was die Gesamtquote verschweigt", d: "25 min", x: "Eine KI entscheidet in 89,5 % aller Fälle richtig. In Gruppe A lehnt sie aber 10 % zu Unrecht ab, in Gruppe B 40 %. Rechnet ein eigenes Beispiel durch und beurteilt, ob das System eingesetzt werden darf." },
    { b: 0, t: "Neuronales Netz zum Anfassen", d: "30 min", x: "Trainiere ein kleines Netz, bis es die Spirale trennt. Was ändern mehr Schichten, mehr Neuronen, eine andere Lernrate?", url: "https://playground.tensorflow.org/", ut: "TensorFlow Playground" },
    { b: 2, o: "in der Gruppe", t: "Kopfstand: Wie macht mich KI möglichst dumm?", d: "20 min", x: "Sammelt zu zweit die sichersten Wege, mit KI nichts zu lernen. Dreht jede Idee um – daraus entstehen eure eigenen Regeln." },
    { b: 2, o: "in der Gruppe", t: "KI in der Facharbeit", d: "30 min", x: "Legt für eine Beispielarbeit ein Verzeichnis an: Werkzeug, Zweck, Stelle im Text. Prüft drei von einer KI genannte Quellen: Gibt es sie? Steht dort, was behauptet wird?" },
    { b: 3, o: "in der Gruppe", t: "Schulparlament: Unsere KI-Regeln", d: "90 min", x: "Entwerft in Fraktionen Regeln für KI an unserer Schule, debattiert und stimmt ab. Die Ergebnisse gehen an die Schulkonferenz." }
  ],
  spiele: [
    { typ: "sortieren", t: "Lernturbo oder Lernbremse?", intro: "Macht dich diese Art, KI zu nutzen, besser – oder nur schneller fertig? Prüffrage nach jedem Chat: Könnte ich das morgen ohne KI?",
      kat: ["🚀 Lernturbo", "🛑 Lernbremse"],
      karten: [
        ["Du löst die Aufgabe allein und lässt dir danach deine Fehler zeigen.", 0, "Du denkst zuerst selbst – die Rückmeldung trifft dann genau deine Lücken."],
        ["Du lässt den Aufsatz schreiben und gibst ihn ab.", 1, "Das Produkt ist fertig, gelernt hast du nichts. Außerdem ist es eine Täuschung."],
        ["Du lässt dich von der KI zum Stoff abfragen.", 0, "Abrufen aus dem Gedächtnis ist eine der wirksamsten Lernmethoden."],
        ["Du kopierst die Zusammenfassung, ohne den Text gelesen zu haben.", 1, "Du weißt nicht, was fehlt oder falsch ist – und hast den Text nie verarbeitet."],
        ["Du bittest um einen Tipp statt um die Lösung.", 0, "Ein Tipp hält dich im Denken, die Lösung beendet es."],
        ["Die KI schreibt dir Code, den du nicht erklären kannst.", 1, "Was du nicht erklären kannst, kannst du in der Klausur auch nicht schreiben."],
        ["Du lässt dir etwas erklären und erklärst es danach jemandem in eigenen Worten.", 0, "Erst beim eigenen Erklären merkst du, ob du es verstanden hast."],
        ["Du übernimmst die Quellenangaben der KI ungeprüft in die Facharbeit.", 1, "Sprachmodelle erfinden Quellen. Zitiert wird nur, was du selbst gelesen hast."]
      ] }
  ],
  quiz: [
    { f: "Was ist ein Systemprompt?", a: ["Eine Anweisung, die das Verhalten eines Assistenten vor dem Gespräch festlegt", "Die erste Frage, die ein Nutzer stellt", "Eine Fehlermeldung des Betriebssystems", "Das Passwort für die KI"], e: "Im Systemprompt stehen Rolle, Ablauf und Grenzen des Assistenten. Er gilt für das ganze Gespräch." },
    { f: "Du hast für deine Facharbeit eine KI zum Gliedern benutzt. Was ist richtig?", a: ["Ich lege nach den Vorgaben offen, welches Werkzeug ich wofür genutzt habe – verantwortlich für den Inhalt bleibe ich", "Gliedern zählt nicht, das muss ich nicht angeben", "Ich gebe die KI als Mitautorin an und teile die Verantwortung", "KI ist in Facharbeiten grundsätzlich verboten"], e: "Transparenz und eigene Verantwortung gehören zusammen. Was genau anzugeben ist, regeln die Vorgaben für die Arbeit." },
    { f: "Eine KI nennt dir eine Studie mit Autor, Titel und Jahr. Wann darfst du sie zitieren?", a: ["Wenn ich die Quelle selbst gefunden und gelesen habe", "Sofort, die Angaben sind ja vollständig", "Wenn eine zweite KI dieselbe Studie nennt", "Wenn der Titel wissenschaftlich klingt"], e: "Sprachmodelle erzeugen auch Quellenangaben nach Wahrscheinlichkeit. Manche existieren nicht oder sagen etwas anderes aus." },
    { f: "Warum reicht es nicht, das Merkmal „Geschlecht“ aus den Trainingsdaten zu löschen, um einen Bewerbungsfilter fair zu machen?", a: ["Andere Merkmale wie Vorname oder Vereine verraten es indirekt", "Weil die KI das Geschlecht ohnehin errät, indem sie die Bewerber fragt", "Weil man Daten nicht löschen kann", "Es reicht – dann ist der Filter fair"], e: "Verzerrungen stecken in vielen zusammenhängenden Merkmalen. Fairness muss man deshalb mit Testfällen prüfen." },
    { f: "Welche Aussage über Lernen und Leistung stimmt?", a: ["Ein gutes Produkt, das mit KI entstanden ist, zeigt noch nicht, dass ich es selbst kann", "Wer ein gutes Ergebnis abgibt, hat es auch gelernt", "Mit KI lernt man automatisch schneller", "Ohne KI lernt man grundsätzlich besser"], e: "Lernweg und Produkt sind zweierlei. Entscheidend ist, was du danach ohne Hilfe kannst." },
    { f: "Wie prüfst du einen selbst gebauten Lernassistenten sinnvoll?", a: ["Mit gezielten Testfällen: falsche Lösungen, Grenzfälle, Bitte um die fertige Lösung", "Ich stelle eine einfache Frage – wenn die stimmt, passt alles", "Ich frage den Assistenten, ob er gut ist", "Gar nicht, der Systemprompt regelt das"], e: "Erst Testfälle zeigen, ob der Assistent Fehler erkennt, beim Thema bleibt und nicht einfach die Lösung verrät." }
  ],
  praxis: { t: "Mein Lernassistent", x: "Erstellen Sie für ein Fach Ihrer Wahl einen Lernassistenten. Prüfen Sie ihn mit drei eigenen Testfällen und verbessern Sie den Systemprompt. Stellen Sie Assistent, Testfälle und Grenzen in drei Minuten vor.", n: "Systemprompt, drei Testfälle mit Ergebnis, Kurzvorstellung" }
}
];

/* Das Wichtigste je Klasse – erscheint in der Zusammenfassung */
const MERK = {
  A: [
    "Eine KI lernt aus sehr vielen Beispielen, den Trainingsdaten. Was dort fehlt oder falsch ist, kann sie nicht richtig.",
    "Ein Prompt ist mein Auftrag an die KI. Je klarer er ist, desto besser passt die Antwort.",
    "Derselbe Prompt kann verschiedene Antworten liefern, weil die KI ihre Wörter nach Wahrscheinlichkeit auswählt.",
    "Eine KI kann halluzinieren: Sie erfindet etwas, das überzeugend klingt, aber nicht stimmt.",
    "Persönliche Daten bleiben draußen – meine eigenen und die von anderen."
  ],
  B: [
    "Ein starker Prompt hat vier Bausteine: Rolle, Aufgabe, Kontext, Format.",
    "Angaben einer KI prüfe ich in einer zweiten, verlässlichen Quelle.",
    "Deepfakes sind mit KI erzeugte oder veränderte Bilder, Videos oder Tonaufnahmen, die echt wirken.",
    "Fotos und Daten anderer Menschen gebe ich nicht ohne ihre Erlaubnis in eine KI (Recht am eigenen Bild).",
    "Empfehlungssysteme lernen aus meinem Verhalten und zeigen mir nur einen Ausschnitt.",
    "Ich gebe an, wobei mir KI geholfen hat. Verantwortlich für das Ergebnis bleibe ich."
  ],
  C: [
    "Ein Sprachmodell setzt Text Token für Token nach Wahrscheinlichkeit fort. Ob der Inhalt stimmt, prüft es nicht.",
    "Drei Lernarten: überwacht (beschriftete Daten), unüberwacht (findet selbst Gruppen), bestärkend (Belohnung und Bestrafung).",
    "Wie gut ein Modell ist, zeigen erst Testdaten. Überanpassung: sehr gut auf Trainingsdaten, schlecht auf neuen Fällen.",
    "Bias: Eine KI übernimmt Verzerrungen aus ihren Trainingsdaten und kann sie verstärken.",
    "Europäische KI-Verordnung: Je höher das Risiko einer Anwendung, desto strenger die Regeln. KI-erzeugte Inhalte müssen erkennbar sein.",
    "KI hilft beim Lernen, wenn ich zuerst selbst denke und sie mich prüft oder mir Rückmeldung gibt."
  ],
  D: [
    "Ein Systemprompt legt Rolle, Ablauf und Grenzen eines Assistenten fest. Ein sicherer Filter ist er nicht.",
    "Einen Assistenten prüft man mit Testfällen: falsche Lösung, Grenzfall, Mogelversuch.",
    "Zitiert wird nur, was ich selbst gefunden und gelesen habe. Sprachmodelle erfinden auch Quellen.",
    "Den KI-Einsatz in Facharbeit und Komplexer Leistung lege ich offen. Die Verantwortung für den Inhalt bleibt bei mir.",
    "Lernweg und Produkt sind zweierlei. Prüffrage nach jedem Chat: Könnte ich das morgen ohne KI?",
    "Eine gute Gesamtquote kann verdecken, dass ein System einzelne Gruppen benachteiligt."
  ]
};

