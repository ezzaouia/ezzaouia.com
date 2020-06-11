---
title: Multimodal Emotions Awareness in Online Learning
date: '2017-03-09'
spoiler: Can we support emotions awareness in online learning?
paper: >-
  EMODA: A Tutor Oriented Multimodal and Contextual Emotional Dashboard
published: '2017-03-09'
at: LAK
venue: Conference
contributors: 
  - name: Mohamed Ez-zaouia
    avatar: mohamed
  - name: Elise Lavoué
    avatar: elise
---

> _Not all computers need to pay attention to emotions, or to have emotional abilities. Some machines are useful as rigid tools, and it is fine to keep them that way. However, there are situations where the human-machine interaction could be improved by having machines naturally adapt to their users, and where communication about when, where, how, and how important it is to adapt involves emotional information, possibly including expressions of frustration, confusion, disliking, interest, and more._ <br/>
> <cite>Picard, 1999</cite>[^Picard] 

[^Picard]:
  Picard, Rosalind W. (1999). “Affective Computing for HCI.” In: Proceedings of HCI International (the 8th International Conference on Human-Computer Interaction) on Human-Computer Interaction: Ergonomics and User Interfaces-Volume I - Volume I. USA: L. Erlbaum Associates Inc., pp. 829–833. isbn: 0805833919.

## 🖐️ The big picture
Emotion plays an important role in learning experiences, processes, and outcomes.
Capturing emotional _awareness cues_ about learners and making them available to teachers may prove useful in fostering sustainable socio-affective relationships. Such an enterprise, is, however, challenging given the complex nature of human emotions; it would be more complete to rely on different modalities to capture, quantify, and integrate cues about learners' emotional states.

>_Can we support multimodal emotional awareness in online learning?_

To examine this question in the setting of  in the setting of SpeakPlus[^SpeakPlus] —see figure below, which is a video-conferencing platform dedicated to improving oral communication skills in a foreign language, i.e., English, French, and Spanish. Teachers use SpeakPlus to deliver virtual live classes to learners. We conducted a case study investigating a multimodal approach, i.e., applying two theoretical models of emotion: discrete and dimensional —see figure below*[^EModels], and for using commercial cloud APIs for emotion recognition when inferring learners' emotions in online learning environments. We demonstrated this approach in the context of SpeakPlus through the use of audio and video streams when inferring automated emotions along with learners' self-reported emotions, as well as contextual teachers' and learners' interaction traces on the platform.

[^SpeakPlus]:
  SpeakPlus was a raising startup launched in 2014 by two the co-founders <a href="https://www.linkedin.com/in/cirojaenpaniza/" target="_blank">Ciro</a> and <a href="https://www.linkedin.com/in/xavierbarry/" target="_blank">Xavier</a>. The startup operated from 2014 to 2017. Unfortunately, it shut down in late 2017.


![Dimensional and discrete models of emotions.](./emotion-models.jpg)

[^EModels]:
  Facial expression from CK+ & Jaffe datasets.

In addition to proving the feasibility of using cloud APIs for emotion recognition in online learning environments, we analyze 10 learning sessions of 45 minutes each —more than 7 hours' recording in total, to compare emotions from two modalities: audio and video.
We propose an approach for combining discrete and dimensional emotional cues to capture learners' emotional states. Our findings —of a pilot study with two teachers, highlight the pertinence of the multimodal approach for inferring emotion in distance learning, where, in particular, different emotions are detected from different sources, i.e., audio and video, during such settings.

![SpeakPlus platform.](./speakplus.jpg)

![The architecture of the dashboard build upon the SpeakPlus learning platform.](./emoda-arch.jpg)

## Highlights
  
- A case study of using heterogeneous APIs when inferring automated emotional awareness cues of learners' emotions from  audio and video alongside self-reported emotions and contextual users' interaction traces in online/distance learning.
- A method for unifying discrete and dimensional models of emotions.
- A qualitative and quantitative exploratory analysis comparing learners' inferred emotions from audio and video.

## BibTeX Citation
```jsx
@inproceedings{Ezzaouia_LAK2017_Emoda,
  title = "EMODA: A Tutor Oriented Multimodal and Contextual Emotional Dashboard",
  booktitle = "Proceedings of the Seventh International Learning Analytics \& Knowledge Conference",
  author = "Ez-zaouia, Mohamed and Lavou{\'e}, Elise",
  year = "2017",
  pages = "429--438",
  publisher = "ACM",
  address = "Vancouver, British Columbia, Canada",
  doi = "10.1145/3027385.3027434",
  acmid = "3027434",
  isbn = {978-1-4503-4870-6},
  keywords = "emotions, interactive visualizations, language training, learner monitoring,multimodal data, tutor dashboard",
  numpages = "10",
  series = "LAK '17"
}
```

## Preprint Paper
EMODA: A Tutor Oriented Multimodal and Contextual Emotional Dashboard.
<a href="./Ezzaouia_LAK2017_Emoda.pdf" target="_blank">Download a pdf</a>.
