class PortfolioChatbot {
    constructor() {
        this.knowledge = {
            skills: ['Python', 'Data Science', 'Machine Learning', 'Web Development', 'AWS'],
            projects: {
                'stock-prediction': 'A machine learning model for predicting stock market trends',
                'plant-disease': 'AI-powered plant disease detection system',
                'netflix': 'Netflix data analysis and recommendation system',
                'flight-data': 'Flight data analysis and prediction model',
                'web-scraping': 'Web scraping and data analysis project',
                'wine': 'Wine quality prediction using machine learning'
            }
        };
        this.messageHistory = [];
        this.conversationContext = null;
        this.init();
    }

    init() {
        // Use existing chat widget in HTML instead of creating a new one
        this.bindEvents();
        // Add initial bot message to the chat
        this.addInitialMessage();
    }
    
    addInitialMessage() {
        const chatBody = document.querySelector('.chat-body');
        if (chatBody) {
            const initialMessage = document.createElement('div');
            initialMessage.classList.add('message', 'bot-message');
            initialMessage.innerHTML = `
                Hi! I'm your personal assistant. I can help you learn more about:
                <br>• My skills and experience
                <br>• My projects
                <br>• My background
                <br>What would you like to know?
            `;
            chatBody.appendChild(initialMessage);
        }
    }

    bindEvents() {
        const chatToggleBtn = document.querySelector('.chat-toggle-btn');
        const closeBtn = document.querySelector('.close-btn');
        const chatWidget = document.querySelector('.chat-widget');
        const chatInput = document.querySelector('.chat-input');
        const chatSendBtn = document.querySelector('.chat-send-btn');

        // Toggle chat widget
        chatToggleBtn.addEventListener('click', () => {
            chatWidget.style.display = chatWidget.style.display === 'none' ? 'flex' : 'none';
        });

        // Close chat widget
        closeBtn.addEventListener('click', () => {
            chatWidget.style.display = 'none';
        });

        // Send message on button click
        chatSendBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                this.addMessage('user-message', message);
                this.processMessage(message);
                chatInput.value = '';
            }
        });

        // Send message on Enter key
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = chatInput.value.trim();
                if (message) {
                    this.addMessage('user-message', message);
                    this.processMessage(message);
                    chatInput.value = '';
                }
            }
        });
    }

    addMessage(type, content) {
        const chatBody = document.querySelector('.chat-body');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.textContent = content;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    processMessage(message) {
        message = message.toLowerCase();
        this.messageHistory.push({ type: 'user', content: message });
        
        // Delay bot response for natural feeling
        setTimeout(() => {
            let response;
            
            // Check if this is a follow-up question
            if (this.conversationContext) {
                response = this.handleFollowUp(message);
                if (response) {
                    this.addMessage('bot-message', response);
                    this.messageHistory.push({ type: 'bot', content: response });
                    return;
                }
            }

            // Handle primary intents
            if (message.includes('project') || message.includes('work')) {
                this.conversationContext = 'projects';
                response = 'I\'ve worked on several exciting projects! Here are some highlights:\n' +
                    Object.entries(this.knowledge.projects)
                        .map(([name, desc]) => `• ${name.replace('-', ' ').toUpperCase()}: ${desc}`)
                        .join('\n') +
                    '\n\nWould you like to know more details about any specific project?';
            }
            else if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
                this.conversationContext = 'skills';
                response = 'I\'m proficient in:\n' + 
                    this.knowledge.skills.map(skill => `• ${skill}`).join('\n') +
                    '\n\nWould you like to know more about my experience with any of these technologies?';
            }
            else if (message.includes('background') || message.includes('education') || message.includes('experience')) {
                this.conversationContext = 'background';
                response = 'I\'m a Data Scientist and Full Stack Developer with expertise in machine learning, data analysis, and web development. My background includes both academic projects and practical implementations in various domains. Would you like to know more about my education or work experience?';
            }
            else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
                this.conversationContext = null;
                response = 'Hello! I\'m your personal assistant. I can tell you about my projects, skills, background, or experience. What would you like to know?';
            }
            else if (message.includes('thank')) {
                this.conversationContext = null;
                response = 'You\'re welcome! Let me know if you have any other questions.';
            }
            else {
                this.conversationContext = null;
                response = 'I can tell you about my projects, skills, or background. What would you like to know?';
            }
            
            this.addMessage('bot-message', response);
            this.messageHistory.push({ type: 'bot', content: response });
        }, 500);
    }

    handleFollowUp(message) {
        if (this.conversationContext === 'projects') {
            for (const [projectName, projectDesc] of Object.entries(this.knowledge.projects)) {
                if (message.includes(projectName) || 
                    message.includes(projectName.replace('-', ' '))) {
                    return `The ${projectName.replace('-', ' ').toUpperCase()} project is ${projectDesc}. I used various technologies and methodologies in this project. Would you like to know about the technical details or another project?`;
                }
            }
        }
        else if (this.conversationContext === 'skills') {
            for (const skill of this.knowledge.skills) {
                if (message.includes(skill.toLowerCase())) {
                    return `I have extensive experience with ${skill}. I've used it in several projects including ${Object.keys(this.knowledge.projects).slice(0, 2).join(' and ')}. Would you like to know more about these projects?`;
                }
            }
        }
        else if (this.conversationContext === 'background') {
            if (message.includes('education')) {
                return 'I have a strong educational background in Data Science and Computer Science. Would you like to know about my projects or technical skills?';
            }
            if (message.includes('work') || message.includes('experience')) {
                return 'I have experience working on various data science and machine learning projects. Would you like to know more about specific projects?';
            }
        }
        return null;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
});