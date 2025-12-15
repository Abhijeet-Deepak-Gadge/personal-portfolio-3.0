// Enhanced Portfolio Terminal Class
class PortfolioTerminal {
    constructor() {
        this.portfolioData = {
            help: `Available Commands:
• about     - Learn about me
• skills    - View my technical skills  
• projects  - View my projects
• contact   - How to reach me
• certification- My certification & badges
• education - My educational background
• whoami    - Display current user
• ls        - List directories
• pwd       - Show current directory
• clear     - Clear the terminal
• date      - Show current date and time
• history   - Show command history
• theme     - Terminal theme info`,

            about: `About Abhijeet Gadge:

Passionate Full Stack Java Developer & DevOps Engineer ready to make 
an impact in the technology world. I believe in writing clean, 
efficient code that not only works but inspires others.

🚀 What drives me:
• Creating innovative solutions to real-world problems
• Building user-friendly applications with modern tech
• Continuous learning and staying updated with trends
• Contributing to open-source and developer community`,

            skills: `Technical Skills:

💻 Programming Languages:
C , C++ , Java ,  Python

🌐 Frontend Technologies:
JavaScript , HTML5 , CSS , Tailwind CSS
Responsive Web Design, Cross-browser Compatibility

⚙️ Backend Technologies:
Spring Boot , Hibernate ,  REST APIs
Authentication, Database Integration

🗄️ Databases:
MySQL, MongoDB
Database Design, SQL Queries, NoSQL

🛠️ Tools & Technologies:
Git & GitHub, VS Code, IntelliJ IDEA , Linux CLI
Maven , Microservices , Data Structures , Postman

🌐 Networking:
TCP/IP, OSI Model, HTTP/HTTPS, DNS, DHCP
Client-Server Model, Routing & Switching, Network Security Basics

⚙️ DevOps & Cloud:
Cloud Platforms (AWS basics - EC2, s3, IAM)
Monitoring & Deployment Automation`,

            projects: `Featured Projects:

1. Portfolio Website (HTML/CSS/JS)
Interactive terminal-style portfolio with modern design
Tech: HTML5, CSS3, JavaScript, Responsive Design

2. Journal Management System -
Designed & Developed CRUD - enabled RESTful APIs with Spring Boot
Tech: Java, Spring Boot, MongoDB, OAuth2, Postman, SMTP, Maven

3. Virtual File Management System -
Implemented CLI- based file system with linux commands like ls, man, cd
Tech: C++, Data Structures, File I/O

4. Java-Based DBMS Simulator -
Developed a console-based mini DBMS to simulate SQL operations (INSERT, SELECT, UPDATE, DELETE)
Tech: Java, OOP, Collections Framework`,

            contact: `Contact Information:

📧 Email: abhijeetgadge109@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/abhijeet-gadge/
🐙 GitHub: https://github.com/Abhijeet-Deepak-Gadge
📍 Location: Pune, Maharashtra, India

💬 Preferred Contact:
Email for professional inquiries
LinkedIn for networking opportunities
GitHub for technical discussions

I'm excited to connect with fellow developers, potential 
employers, and anyone interested in discussing technology!`,

            certification: `Certifications & Badges:

📜 Certification
• Oracle Cloud Infrastructure Foundation Associate Certificate (2025)
• Oracle Cloud Infrastructure DevOps Professional Certificate (2025)

📜 Certificates Of Participation
• System Design of a real-time Stock Market Trading Platform Masterclass By Scaler (2025)
• Multi-Cloud workshop participation certification By CoreXtech (2025)

🏅 Badges
• AWS Educate Introduction to Cloud Badge (2025)
• AWS Educate Getting Started with Storage Badge (2025)`,

            education: `Education:

🎓 Bachelor's Degree in Computer Application (2023 - 2025)
• CGPA: 8.3/10
• Relevant Coursework: Data Structures, Algorithms, 
  Database Systems, Software Engineering, Web Technologies
• Final Year Project: food delivery website

🎓 Higher Secondary Education 12th (2020 - 2021)
• Science Stream with Mathematics , Biology , Chemistry , Physics
• Percentage: 78.83%
• Strong foundation in Mathematics and Physics

📚 Continuous Learning:
• Full Stack Web Development Bootcamp (Online)
• C, C++ Algorithms and Data Structures (freeCodeCamp)
• Cloud Computing (Oracle)
• Java Spring Boot (Infosys Springboard)
• Git and GitHub Masterclass

🏆 Academic Achievements:
• Third Place in college 
• Member  of National Service Scheme (NSS)
• Active member of Computer Science Students Association`,

            whoami: "abhijeet - Full Stack Java Developer & DevOps Engineer",
            pwd: "/home/abhijeet/portfolio",
            ls: "about.txt  skills/",
            date: () => new Date().toLocaleString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                timeZone: 'Asia/Kolkata'
            }) + ' IST',
            theme: "Terminal Theme: Matrix Green v2.1\nColor Scheme: Dark with neon green accents",
            history: () => this.getCommandHistory()
        };

        this.commandHistory = [];
        this.historyIndex = -1;
        this.maxHistorySize = 50;
        
        this.init();
    }

    init() {
        this.terminalInput = document.getElementById('terminalInput');
        this.terminalContent = document.getElementById('terminalContent');
        this.commandHistoryDiv = document.getElementById('commandHistory');
        this.cursor = document.getElementById('cursor');
        this.textMeasure = document.getElementById('textMeasure');
        
        if (!this.terminalInput || !this.terminalContent) {
            console.error('Terminal elements not found');
            return;
        }

        this.bindEvents();
        this.terminalInput.focus();
        this.updateCursorPosition();
    }

    bindEvents() {
        // Remove existing listeners
        this.terminalInput.removeEventListener('keydown', this.handleKeyDown);
        this.terminalInput.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Cursor position updates
        this.terminalInput.addEventListener('input', () => this.updateCursorPosition());
        this.terminalInput.addEventListener('keyup', () => this.updateCursorPosition());
        this.terminalInput.addEventListener('click', () => this.updateCursorPosition());
        this.terminalInput.addEventListener('focus', () => {
            this.cursor.style.display = 'block';
            this.updateCursorPosition();
        });

        // Keep focus on terminal
        this.terminalContent.addEventListener('click', () => {
            this.terminalInput.focus();
        });
    }

    updateCursorPosition() {
        const inputValue = this.terminalInput.value;
        const cursorPosition = this.terminalInput.selectionStart;
        
        // Get text before cursor position
        const textBeforeCursor = inputValue.substring(0, cursorPosition);
        
        // Measure text width
        this.textMeasure.textContent = textBeforeCursor;
        const textWidth = this.textMeasure.offsetWidth;
        
        // Get prompt width
        const prompt = this.terminalInput.parentElement.querySelector('.terminal-prompt');
        const promptWidth = prompt ? prompt.offsetWidth : 0;
        
        // Position cursor
        this.cursor.style.left = (promptWidth + textWidth) + 'px';
        
        // Show/hide cursor based on focus and content
        if (this.terminalInput === document.activeElement) {
            this.cursor.style.display = 'block';
        } else {
            this.cursor.style.display = 'none';
        }
    }

    handleKeyDown(e) {
        switch(e.key) {
            case 'Enter':
                e.preventDefault();
                this.handleEnter();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory('up');
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory('down');
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'Home':
            case 'End':
                // Update cursor position after key processing
                setTimeout(() => this.updateCursorPosition(), 0);
                break;
            case 'Tab':
                e.preventDefault();
                this.handleTabCompletion();
                break;
            case 'c':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.handleCtrlC();
                }
                break;
        }
    }

    handleEnter() {
        const command = this.terminalInput.value.trim();
        
        if (command) {
            this.executeCommand(command);
            this.addToHistory(command);
        } else {
            // Show empty prompt for empty command
            this.addToCommandHistory(`<div class="terminal-line">
                <span class="terminal-prompt">abhijeet@portfolio:~$</span>
            </div>`);
        }
        
        this.terminalInput.value = '';
        this.historyIndex = -1;
        this.updateCursorPosition();
    }

    async executeCommand(command) {
        const normalizedCommand = command.toLowerCase();
        
        // Show the command that was executed
        this.addToCommandHistory(`<div class="terminal-line">
            <span class="terminal-prompt">abhijeet@portfolio:~$</span>
            <span class="terminal-command">${command}</span>
        </div>`);

        // Handle special commands
        if (normalizedCommand === 'clear') {
            this.clearTerminal();
            return;
        }

        // Execute command
        if (this.portfolioData[normalizedCommand]) {
            const result = typeof this.portfolioData[normalizedCommand] === 'function' 
                ? this.portfolioData[normalizedCommand]() 
                : this.portfolioData[normalizedCommand];
            
            await this.typeWriterEffect(result);
        } else {
            await this.handleUnknownCommand(normalizedCommand);
        }

        this.scrollToBottom();
    }

    async typeWriterEffect(text, isError = false) {
        // Create output div
        const outputDiv = document.createElement('div');
        outputDiv.className = `terminal-output ${isError ? 'error-text' : ''}`;
        outputDiv.style.whiteSpace = 'pre-wrap';
        this.commandHistoryDiv.appendChild(outputDiv);

        // Split text into lines
        const lines = text.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Type each character of the line
            for (let j = 0; j < line.length; j++) {
                outputDiv.textContent += line[j];
                this.scrollToBottom();
                
                // Adjust speed based on character (faster for spaces)
                const delay = line[j] === ' ' ? 5 : 15;
                await this.sleep(delay);
            }
            
            // Add newline if not the last line
            if (i < lines.length - 1) {
                outputDiv.textContent += '\n';
            }
            
            this.scrollToBottom();
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async handleUnknownCommand(command) {
        const suggestion = this.getSuggestion(command);
        if (suggestion) {
            const message = `Command not found: ${command}\nDid you mean: ${suggestion}?\nType 'help' for available commands.`;
            await this.typeWriterEffect(message, true);
        } else {
            const message = `bash: ${command}: command not found\nType 'help' for available commands.`;
            await this.typeWriterEffect(message, true);
        }
    }

    getSuggestion(command) {
        const commands = Object.keys(this.portfolioData);
        const threshold = 2;
        
        for (const cmd of commands) {
            if (this.levenshteinDistance(command, cmd) <= threshold) {
                return cmd;
            }
        }
        
        // Check for partial matches
        const partialMatch = commands.find(cmd => 
            cmd.includes(command) || command.includes(cmd)
        );
        
        return partialMatch || null;
    }

    levenshteinDistance(str1, str2) {
        const matrix = Array(str2.length + 1).fill(null).map(() => 
            Array(str1.length + 1).fill(null)
        );

        for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
        for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

        for (let j = 1; j <= str2.length; j++) {
            for (let i = 1; i <= str1.length; i++) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(
                    matrix[j][i - 1] + 1,
                    matrix[j - 1][i] + 1,
                    matrix[j - 1][i - 1] + indicator
                );
            }
        }

        return matrix[str2.length][str1.length];
    }

    handleTabCompletion() {
        const input = this.terminalInput.value.toLowerCase();
        if (!input) return;

        const commands = Object.keys(this.portfolioData);
        const matches = commands.filter(cmd => cmd.startsWith(input));

        if (matches.length === 1) {
            this.terminalInput.value = matches[0];
            this.updateCursorPosition();
        } else if (matches.length > 1) {
            this.addToCommandHistory(`<div class="terminal-output info-text">
                Available completions: ${matches.join(', ')}
            </div>`);
            this.scrollToBottom();
        }
    }

    handleCtrlC() {
        this.addToCommandHistory(`<div class="terminal-line">
            <span class="terminal-prompt">abhijeet@portfolio:~$</span>
            <span class="terminal-command">${this.terminalInput.value}</span><span class="error-text">^C</span>
        </div>`);
        this.terminalInput.value = '';
        this.updateCursorPosition();
        this.scrollToBottom();
    }

    addToHistory(command) {
        if (this.commandHistory[0] !== command) {
            this.commandHistory.unshift(command);
            
            if (this.commandHistory.length > this.maxHistorySize) {
                this.commandHistory = this.commandHistory.slice(0, this.maxHistorySize);
            }
        }
    }

    getCommandHistory() {
        if (this.commandHistory.length === 0) {
            return "No commands in history.";
        }
        
        return this.commandHistory
            .slice(0, 10)
            .map((cmd, index) => `${index + 1}. ${cmd}`)
            .join('\n');
    }

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.terminalInput.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.terminalInput.value = this.commandHistory[this.historyIndex];
            } else if (this.historyIndex === 0) {
                this.historyIndex = -1;
                this.terminalInput.value = '';
            }
        }
        this.updateCursorPosition();
    }

    clearTerminal() {
        if (this.commandHistoryDiv) {
            this.commandHistoryDiv.innerHTML = '';
        }
        this.terminalInput.focus();
    }

    addToCommandHistory(content) {
        if (this.commandHistoryDiv) {
            const outputDiv = document.createElement('div');
            outputDiv.innerHTML = content;
            this.commandHistoryDiv.appendChild(outputDiv);
        }
    }

    scrollToBottom() {
        requestAnimationFrame(() => {
            this.terminalContent.scrollTop = this.terminalContent.scrollHeight;
        });
    }
}

// Other JavaScript Functions
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true, timeZone: 'Asia/Kolkata'
    };
    const dateTimeElement = document.getElementById('dateTime');
    if (dateTimeElement) {
        dateTimeElement.textContent = now.toLocaleString('en-US', options) + ' IST';
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Initialize terminal
    window.portfolioTerminal = new PortfolioTerminal();
    
    // Update date and time
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        });
    });

    // Navigation scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav')) {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});