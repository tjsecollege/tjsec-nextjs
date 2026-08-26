(function () {
    "use strict";

    var TOPICS = {
        apply: {
            label: "Apply Now",
            keywords: ["apply", "admission form", "join", "enroll", "enrol", "register"],
            reply: "Admissions 2026 are open! Just share your Name, Phone & Email in our quick enquiry form (Admission Code: 1241) and our team will call you with eligibility & fee details.",
            actions: [
                { text: "Open Application Form", href: "#contact" },
                { text: "Call 044-27967602", href: "tel:+914427967602" }
            ]
        },
        about: {
            label: "About College",
            keywords: ["about", "college", "history", "naac", "accredit", "established", "founded"],
            reply: "T.J.S Engineering College was established in 2009 by the T.J.Sivananda Mudaliar Educational Trust. We're an autonomous, NAAC 'A' Grade & ISO 9001:2015 certified institution, AICTE approved and affiliated to Anna University — home to 5,000+ students and 87+ faculty.",
            actions: [{ text: "More About Us", href: "#about" }]
        },
        admission: {
            label: "Admission Process",
            keywords: ["admission process", "eligibility", "how to apply", "procedure", "cutoff", "tancet", "counselling"],
            reply: "The process is simple: fill the enquiry form with your basic details and preferred course, and our admission counsellors will guide you through eligibility, documents and fees.",
            actions: [{ text: "Fill Enquiry Form", href: "#contact" }]
        },
        courses: {
            label: "Courses Offered",
            keywords: ["course", "courses", "department", "program", "programme", "branch", "cse", "ece", "eee", "mechanical", "mba", "ai", "data science", "b.e", "b.tech", "fee", "fees"],
            reply: "We offer B.E. Computer Science Engineering, B.Tech Artificial Intelligence & Data Science, B.E. Electronics & Communication, B.E. Electrical & Electronics, B.E. Mechanical Engineering, and MBA. Share the course you're interested in and we'll send fee details.",
            actions: [{ text: "Explore Programs", href: "#academics" }]
        },
        placements: {
            label: "Placements",
            keywords: ["placement", "placements", "job", "jobs", "company", "companies", "package", "salary", "career"],
            reply: "T.J.S has a strong 90% placement record, backed by industry connections and a dedicated Training & Placement Cell that prepares students for successful careers.",
            actions: [{ text: "See Placements", href: "#placements" }]
        },
        campus: {
            label: "Campus Life",
            keywords: ["campus", "hostel", "life", "library", "sports", "club", "facilities", "food", "mess"],
            reply: "From hostels and libraries to sports grounds and student clubs, T.J.S offers a well-rounded campus experience alongside academics.",
            actions: [{ text: "Explore Campus Life", href: "#campus-life" }]
        },
        scholarship: {
            label: "Scholarships",
            keywords: ["scholarship", "scholarships", "waiver", "discount", "financial aid", "concession"],
            reply: "Merit-based scholarships are available for eligible students. Share your academic scores with our admission team and we'll let you know what you qualify for.",
            actions: [{ text: "Talk to Admissions", href: "tel:+914427967602" }]
        },
        contact: {
            label: "Contact Details",
            keywords: ["contact", "phone", "call", "email", "address", "location", "reach", "number"],
            reply: "You can reach us at 044-27967602 or admission@tjsec.in, or leave your details in our enquiry form and we'll call you back.",
            actions: [
                { text: "Call Now", href: "tel:+914427967602" },
                { text: "Email Us", href: "mailto:admission@tjsec.in" }
            ]
        }
    };

    var TOPIC_ORDER = ["apply", "about", "admission", "courses", "placements", "campus", "scholarship", "contact"];

    var FALLBACK = "I'm still learning! For a quick, exact answer please call 044-27967602 or email admission@tjsec.in — or pick a topic below.";

    function findTopicByKeyword(text) {
        var lower = text.toLowerCase();
        for (var i = 0; i < TOPIC_ORDER.length; i++) {
            var topic = TOPICS[TOPIC_ORDER[i]];
            for (var j = 0; j < topic.keywords.length; j++) {
                if (lower.indexOf(topic.keywords[j]) !== -1) {
                    return topic;
                }
            }
        }
        return null;
    }

    document.addEventListener("DOMContentLoaded", function () {
        var root = document.getElementById("tjsChatbot");
        if (!root) return;

        var toggleBtn = document.getElementById("tjsChatbotToggle");
        var body = document.getElementById("tjsChatbotBody");
        var form = document.getElementById("tjsChatbotForm");
        var input = document.getElementById("tjsChatbotInput");
        var restartBtn = document.getElementById("tjsChatbotRestart");
        var minimizeBtn = document.getElementById("tjsChatbotMinimize");
        var teaser = document.getElementById("tjsChatbotTeaser");
        var teaserClose = document.getElementById("tjsChatbotTeaserClose");

        function scrollToBottom() {
            body.scrollTop = body.scrollHeight;
        }

        function scrollElementIntoView(el) {
            if (!el) return;
            var overflowing = body.scrollHeight > body.clientHeight + 1;
            if (!overflowing) return;
            el.scrollIntoView({ block: "start" });
        }

        function addBotMessage(text, actions) {
            var msg = document.createElement("div");
            msg.className = "tjs-msg bot";
            msg.textContent = text;

            if (actions && actions.length) {
                var wrap = document.createElement("div");
                wrap.className = "tjs-msg-actions";
                actions.forEach(function (action) {
                    var a = document.createElement("a");
                    a.href = action.href;
                    a.textContent = action.text;
                    if (action.href.charAt(0) === "#") {
                        a.addEventListener("click", function () {
                            closePanel();
                        });
                    } else {
                        a.target = "_blank";
                        a.rel = "noopener";
                    }
                    wrap.appendChild(a);
                });
                msg.appendChild(wrap);
            }

            body.appendChild(msg);
            scrollElementIntoView(msg);
        }

        function addUserMessage(text) {
            var msg = document.createElement("div");
            msg.className = "tjs-msg user";
            msg.textContent = text;
            body.appendChild(msg);
            scrollElementIntoView(msg);
        }

        function showTyping(callback) {
            var typing = document.createElement("div");
            typing.className = "tjs-msg bot typing";
            typing.innerHTML = "<span></span><span></span><span></span>";
            body.appendChild(typing);
            scrollElementIntoView(typing);
            setTimeout(function () {
                typing.remove();
                callback();
            }, 550);
        }

        function renderQuickReplies() {
            var existing = body.querySelector(".tjs-chatbot-quickreplies");
            if (existing) existing.remove();

            var wrap = document.createElement("div");
            wrap.className = "tjs-chatbot-quickreplies";
            TOPIC_ORDER.forEach(function (key) {
                var topic = TOPICS[key];
                var btn = document.createElement("button");
                btn.type = "button";
                btn.textContent = topic.label;
                btn.addEventListener("click", function () {
                    handleTopic(topic, topic.label);
                });
                wrap.appendChild(btn);
            });
            body.appendChild(wrap);
        }

        function handleTopic(topic, userText) {
            if (userText) addUserMessage(userText);
            showTyping(function () {
                addBotMessage(topic.reply, topic.actions);
                showTyping(function () {
                    renderQuickReplies();
                });
            });
        }

        function handleFreeText(text) {
            addUserMessage(text);
            var topic = findTopicByKeyword(text);
            showTyping(function () {
                if (topic) {
                    addBotMessage(topic.reply, topic.actions);
                } else {
                    addBotMessage(FALLBACK);
                }
                showTyping(function () {
                    renderQuickReplies();
                });
            });
        }

        function startConversation() {
            body.innerHTML = "";
            addBotMessage("Hello! I'm Tara — your Admission Assistant at T.J.S Engineering College 👋");
            addBotMessage("Admissions 2026 Open! NAAC 'A' Grade | AICTE Approved | 90% Placements. How can I help you today?");
            renderQuickReplies();
        }

        function openPanel() {
            root.classList.add("is-open");
            hideTeaser();
            input.focus();
        }

        function closePanel() {
            root.classList.remove("is-open");
        }

        function togglePanel() {
            if (root.classList.contains("is-open")) {
                closePanel();
            } else {
                openPanel();
            }
        }

        function hideTeaser() {
            if (teaser) teaser.classList.remove("is-visible");
        }

        body.addEventListener("wheel", function (e) {
            e.stopPropagation();
        }, { passive: true });

        body.addEventListener("touchmove", function (e) {
            e.stopPropagation();
        }, { passive: true });

        toggleBtn.addEventListener("click", togglePanel);
        minimizeBtn.addEventListener("click", closePanel);
        restartBtn.addEventListener("click", startConversation);

        if (teaserClose) {
            teaserClose.addEventListener("click", function (e) {
                e.stopPropagation();
                hideTeaser();
                try { sessionStorage.setItem("tjsChatbotTeaserDismissed", "1"); } catch (err) {}
            });
        }

        if (teaser) {
            teaser.addEventListener("click", openPanel);

            var dismissed = false;
            try { dismissed = sessionStorage.getItem("tjsChatbotTeaserDismissed") === "1"; } catch (err) {}

            if (!dismissed) {
                setTimeout(function () {
                    if (!root.classList.contains("is-open")) {
                        teaser.classList.add("is-visible");
                    }
                }, 2500);

                setTimeout(function () {
                    hideTeaser();
                }, 12000);
            }
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var text = input.value.trim();
            if (!text) return;
            input.value = "";
            handleFreeText(text);
        });

        startConversation();
    });
})();
