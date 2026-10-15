export const posts = [
  {
    slug: "a-workspace-that-stays-quiet",
    title: "A workspace that stays quiet.",
    summary: "On giving useful tools a little less visual weight, and your work a little more room.",
    intro: "There is a difference between a tool that can do a lot and a tool that asks for a lot of attention. A workspace can be powerful without making every part of itself visible at once. That balance is something we keep coming back to when thinking about Nap.",
    sections: [
      { title: "Attention is part of the interface", text: "Every badge, panel, and notification makes a small request: look here. Sometimes that request is useful. Sometimes it interrupts a thought that was just starting to take shape. A quieter interface starts by asking which information helps with the task in front of you, and which information can wait until you need it." },
      { title: "Familiar beats spectacular", text: "When you return to a project, the first few moments should help you find your bearings. Where were you working? What were you trying to change? What did the agent say last? Familiar patterns make those questions easier to answer. The best interaction is often the one you barely notice because it behaves the way you expected." },
      { title: "Space for the work", text: "Quiet does not have to mean empty. It means giving each element a reason to be there, making the next action clear, and leaving enough room to read and think. That is the direction we want for Nap: an interface that supports the conversation around your code without becoming another conversation you have to manage." },
    ],
  },
  {
    slug: "before-you-start-an-agent-session",
    title: "Before you start an agent session.",
    summary: "A few small habits for clearer prompts, smaller changes, and easier reviews.",
    intro: "A useful agent session often starts before the first prompt. Taking a moment to describe the problem, name the constraints, and decide what a good result looks like can give the whole conversation a clearer direction. You do not need a perfect specification. A little structure is enough.",
    sections: [
      { title: "Start with the outcome", text: "Describe what someone should be able to do when the work is finished. A concrete example is usually more useful than a broad instruction to improve something. Include what happens today and what should happen instead. If a screenshot, error message, or short reproduction explains the problem, keep it close to the request." },
      { title: "Name what matters", text: "Mention the boundaries that could change the approach: a route that must stay compatible, a visual style to preserve, or a dependency you want to avoid. Keep the first change small enough to inspect. A focused task makes it easier to understand the result and decide whether the next step still makes sense." },
      { title: "Leave time for review", text: "Finishing a conversation is not the same as understanding a change. Read the result, try the path that motivated it, and check any assumptions the agent made along the way. Before moving on, leave a short note about what changed and what is still open. Your next session will have a better starting point, whether you continue with the same agent or choose another." },
    ],
  },
  {
    slug: "finding-your-way-back",
    title: "Finding your way back.",
    summary: "Why a good stopping point can be just as useful as a productive start.",
    intro: "Most projects are built across many separate stretches of attention. A meeting happens. A different task becomes urgent. You close the laptop and come back tomorrow. The difficult part is often not doing the next piece of work, but remembering why it was the next piece in the first place.",
    sections: [
      { title: "Save the reasoning", text: "A list of changed files can tell you what happened, but it rarely tells the whole story. Leave a sentence about the decision behind a change: what you tried, why you chose it, and which question remains unanswered. Those small notes preserve the thinking that is hardest to reconstruct later." },
      { title: "Make the next step specific", text: "Try ending a session with one clear action rather than a long list of possibilities. Name the screen to inspect, the behavior to reproduce, or the assumption to verify. A concrete next step lowers the effort of starting again. It also gives a future conversation with an agent something more useful than a vague request to continue." },
      { title: "Keep the thread close", text: "The conversation and the project belong together. That is part of the idea behind a shared workspace for coding agents: your tools may change, but your attention is still following one piece of work. A good place to return to should help you reconnect with that thread, so a break can remain a break instead of becoming a fresh investigation." },
    ],
  },
];

export const blogSummaries = [
  {
    slug: "hello-nap",
    title: "A little less friction.",
    summary: "Why we’re bringing your coding agents into one native workspace, with less switching and more room to think.",
  },
  ...posts,
];
