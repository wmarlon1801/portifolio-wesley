<template>
  <div id="app">
    <!-- Header com Navegação -->
    <header class="header">
      <nav class="nav">
        <div class="nav-brand">
          <h2>Portfólio</h2>
        </div>
        <ul class="nav-menu">
          <li><a href="#home" @click="scrollToSection('home')">{{ t('nav.home') }}</a></li>
          <li><a href="#about" @click="scrollToSection('about')">{{ t('nav.about') }}</a></li>
          <li><a href="#experience" @click="scrollToSection('experience')">{{ t('nav.experience') }}</a></li>
          <li><a href="#projects" @click="scrollToSection('projects')">{{ t('nav.projects') }}</a></li>
          <li><a href="#contact" @click="scrollToSection('contact')">{{ t('nav.contact') }}</a></li>
        </ul>
            <button class="theme-toggle" @click="toggleTheme" :title="isDarkMode ? 'Modo Claro' : 'Modo Escuro'" aria-label="Alternar tema">
      <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
    </button>
        <div class="language-dropdown" @click="toggleLanguageDropdown">
          <div class="language-current">
            <span>{{ getCurrentLanguageName() }}</span>
            <i class="fas fa-chevron-down" :class="{ 'rotated': showLanguageDropdown }"></i>
          </div>
          <div class="language-options" v-if="showLanguageDropdown">
            <div 
              v-for="lang in languageOptions" 
              :key="lang.code"
              @click.stop="changeLanguage(lang.code)"
              class="language-option"
              :class="{ 'active': currentLanguage === lang.code }"
            >
              {{ lang.name }}
            </div>
          </div>
        </div>
        <div class="nav-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>

    <!-- Seção Hero -->
    <section id="home" class="hero">
      <div class="floating-circles"></div>
      <div class="hero-content">
        <div class="hero-text">
                    <h1 class="hero-title">
            {{ t('hero.greeting') }} <span class="highlight">Wesley Santos</span>
          </h1>
          <p class="hero-subtitle">{{ t('hero.subtitle') }}</p>
          <p class="hero-description">
            {{ t('hero.description') }}
          </p>
          <div class="hero-buttons">
                <button class="btn btn-primary" @click="scrollToSection('projects')" aria-label="Ver projetos">
      {{ t('hero.viewProjects') }}
    </button>
    <button class="btn btn-secondary" @click="downloadCV" aria-label="Baixar currículo">
      {{ t('hero.downloadCV') }}
    </button>
          </div>
        </div>
        <div class="hero-image">
          <img src="/assets/images/profile.jpeg" alt="Wesley Santos" class="profile-image">
        </div>
      </div>
    </section>

    <!-- Seção de Métricas -->
    <section class="metrics">
      <div class="container">
        <div class="metrics-grid">
          <div class="metric-item">
            <div class="metric-icon">
              <i class="fas fa-code"></i>
            </div>
            <div class="metric-content">
              <h3 class="metric-number">3+</h3>
              <p class="metric-label">{{ t('metrics.yearsExperience') }}</p>
            </div>
          </div>
          <div class="metric-item">
            <div class="metric-icon">
              <i class="fas fa-project-diagram"></i>
            </div>
            <div class="metric-content">
              <h3 class="metric-number">6+</h3>
              <p class="metric-label">{{ t('metrics.projects') }}</p>
            </div>
          </div>
          <div class="metric-item">
            <div class="metric-icon">
              <i class="fas fa-tools"></i>
            </div>
            <div class="metric-content">
              <h3 class="metric-number">15+</h3>
              <p class="metric-label">{{ t('metrics.technologies') }}</p>
            </div>
          </div>
          <div class="metric-item">
            <div class="metric-icon">
              <i class="fas fa-certificate"></i>
            </div>
            <div class="metric-content">
              <h3 class="metric-number">5</h3>
              <p class="metric-label">{{ t('metrics.certifications') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção Sobre -->
    <section id="about" class="about">
      <div class="container">
        <h2 class="section-title">{{ t('about.title') }}</h2>
        <div class="about-content">
          <div class="about-text">
            <p>
              {{ t('about.description') }}
            </p>
            <div class="skills">
              <h3>{{ t('about.skills') }}</h3>
              <div class="skills-grid">
                <div class="skill-item" v-for="skill in skills" :key="skill.name">
                  <div class="skill-name">{{ skill.name }}</div>
                  <div class="skill-bar">
                    <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="studies">
              <h3>{{ t('about.studies') }}</h3>
              <p>{{ t('about.studiesDescription') }}</p>
              <div class="studies-grid">
                <div class="study-item" v-for="study in studies" :key="study.name">
                  <div class="study-info">
                    <span class="study-name">{{ study.name }}</span>
                    <span class="study-status">{{ study.status }}</span>
                  </div>
                  <div class="study-bar">
                    <div class="study-progress" :style="{ width: study.progress + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="languages">
              <h3>{{ t('about.languages') }}</h3>
              <div class="languages-grid">
                <div class="language-item" v-for="language in languages" :key="language.name">
                  <div class="language-info">
                    <div class="language-name">{{ language.name }}</div>
                    <div class="language-level">{{ language.level }}</div>
                  </div>
                  <div class="language-bar">
                    <div class="language-progress" :style="{ width: language.progress + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="education">
              <h3>{{ t('about.education') }}</h3>
              <p>{{ t('about.educationDescription') }}</p>
              <div class="education-grid">
                <div class="education-item" v-for="edu in education" :key="edu.id">
                  <div class="education-icon">
                    <i :class="edu.icon"></i>
                  </div>
                  <div class="education-content">
                    <h4>{{ typeof edu.title === 'string' ? edu.title : edu.title[currentLanguage] }}</h4>
                    <p class="education-institution">{{ typeof edu.institution === 'string' ? edu.institution : edu.institution[currentLanguage] }}</p>
                    <span class="education-period">{{ typeof edu.period === 'string' ? edu.period : edu.period[currentLanguage] }}</span>
                    <p v-if="edu.description" class="education-description">
                      {{ typeof edu.description === 'string' ? edu.description : edu.description[currentLanguage] }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="certifications">
              <h3>{{ t('about.certifications') }}</h3>
              <p>{{ t('about.certificationsDescription') }}</p>
              <div class="certifications-grid">
                <div class="certification-item" v-for="cert in certifications" :key="cert.id">
                  <div class="certification-icon">
                    <i :class="cert.icon"></i>
                  </div>
                  <div class="certification-content">
                    <h4>{{ typeof cert.title === 'string' ? cert.title : cert.title[currentLanguage] }}</h4>
                    <p>{{ typeof cert.issuer === 'string' ? cert.issuer : cert.issuer[currentLanguage] }}</p>
                    <span class="certification-date">{{ cert.date }}</span>
                    <p v-if="cert.description" class="certification-description">
                      {{ typeof cert.description === 'string' ? cert.description : cert.description[currentLanguage] }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção Experiência -->
    <section id="experience" class="experience">
      <div class="container">
        <h2 class="section-title">{{ t('experience.title') }}</h2>
        <div class="experience-timeline">
          <div class="experience-item" v-for="exp in experience" :key="exp.id">
            <div class="experience-marker"></div>
            <div class="experience-content">
              <h3>{{ typeof exp.title === 'string' ? exp.title : exp.title[currentLanguage] }}</h3>
              <h4>{{ exp.company }}</h4>
              <p class="experience-period">{{ typeof exp.period === 'string' ? exp.period : exp.period[currentLanguage] }}</p>
              <p class="experience-description">{{ typeof exp.description === 'string' ? exp.description : exp.description[currentLanguage] }}</p>
              <div class="experience-tech">
                <span v-for="tech in exp.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção Projetos -->
    <section id="projects" class="projects">
      <div class="container">
        <h2 class="section-title">{{ t('projects.title') }}</h2>
        
        <!-- Filtros de Projetos -->
        <div class="project-filters">
          <button 
            @click="setProjectFilter('all')" 
            class="filter-btn"
            :class="{ 'active': projectFilter === 'all' }"
          >
            {{ t('projects.filterAll') }}
          </button>
          <button 
            @click="setProjectFilter('csharp')" 
            class="filter-btn"
            :class="{ 'active': projectFilter === 'csharp' }"
          >
            C#/.NET
          </button>
          <button 
            @click="setProjectFilter('java')" 
            class="filter-btn"
            :class="{ 'active': projectFilter === 'java' }"
          >
            Java
          </button>
          <button 
            @click="setProjectFilter('web')" 
            class="filter-btn"
            :class="{ 'active': projectFilter === 'web' }"
          >
            Web
          </button>
          <button 
            @click="setProjectFilter('qa')" 
            class="filter-btn"
            :class="{ 'active': projectFilter === 'qa' }"
          >
            QA
          </button>
        </div>
        
        <div class="projects-grid">
          <div class="project-card" v-for="project in filteredProjects" :key="project.id">
            <div class="project-image">
              <div class="project-placeholder">
                <i :class="project.icon"></i>
              </div>
            </div>
            <div class="project-content">
              <h3>{{ typeof project.title === 'string' ? project.title : project.title[currentLanguage] }}</h3>
              <p>{{ typeof project.description === 'string' ? project.description : project.description[currentLanguage] }}</p>
              <div class="project-tech">
                <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
              <div class="project-links">
                <a :href="project.github" target="_blank" class="project-link">
                  <i class="fab fa-github"></i>
                  <span>{{ t('projects.viewCode') }}</span>
                </a>
                <a v-if="project.live" :href="project.live" target="_blank" class="project-link">
                  <i class="fas fa-external-link-alt"></i>
                  <span>{{ t('projects.demo') }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção Contato -->
    <section id="contact" class="contact">
      <div class="container">
        <h2 class="section-title contact-title">{{ t('contact.title') }}</h2>
        <div class="contact-content">
          <div class="contact-info">
            <h3>{{ t('contact.subtitle') }}</h3>
            <p>{{ t('contact.description') }}</p>
            <div class="contact-details">
              <div class="contact-item">
                <i class="fas fa-user"></i>
                <span>Wesley Marlon Santos Costa Macedo</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>wesleytrabalhos1801@gmail.com</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>+55 (11) 98596-3377</span>
              </div>
            </div>
          </div>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/wesley-macedo-97621b178/" target="_blank" class="social-link linkedin">
              <i class="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/wmarlon1801" target="_blank" class="social-link github">
              <i class="fab fa-github"></i>
              <span>GitHub</span>
            </a>
          </div>

          <div class="contact-form">
            <h3>{{ t('contact.formTitle') }}</h3>
            <form @submit.prevent="submitContactForm" class="form">
              <div class="form-group">
                <input 
                  type="text" 
                  v-model="contactForm.name" 
                  :placeholder="t('contact.formName')" 
                  required
                  class="form-input"
                >
              </div>
              <div class="form-group">
                <input 
                  type="email" 
                  v-model="contactForm.email" 
                  :placeholder="t('contact.formEmail')" 
                  required
                  class="form-input"
                >
              </div>
              <div class="form-group">
                <input 
                  type="text" 
                  v-model="contactForm.subject" 
                  :placeholder="t('contact.formSubject')" 
                  required
                  class="form-input"
                >
              </div>
              <div class="form-group">
                <textarea 
                  v-model="contactForm.message" 
                  :placeholder="t('contact.formMessage')" 
                  required
                  rows="5"
                  class="form-textarea"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
                <span v-else>{{ t('contact.formSubmit') }}</span>
              </button>
            </form>
            <div v-if="formMessage" class="form-message" :class="formMessage.type">
              {{ formMessage.text }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 Wesley Santos. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { contactConfig } from './config/contact.js'

export default {
  name: 'App',
  setup() {
    const currentLanguage = ref('pt')
    const showLanguageDropdown = ref(false)
    const isDarkMode = ref(false)
    const isSubmitting = ref(false)
    const formMessage = ref(null)
    const projectFilter = ref('all')

    const contactForm = ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    const languageOptions = [
      { code: 'pt', name: 'Português' },
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' }
    ]

    const translations = {
      pt: {
        nav: {
          home: 'Início',
          about: 'Sobre',
          experience: 'Experiência',
          projects: 'Projetos',
          contact: 'Contato'
        },
        hero: {
          greeting: 'Olá, eu sou',
          subtitle: 'Desenvolvedor Back-End .NET',
          description: 'Especializado em desenvolvimento de APIs RESTful, sistemas em tempo real com SignalR e autenticação JWT. Experiência sólida em .NET, Entity Framework, Vue.js, Node.js e práticas de DevOps.',
          viewProjects: 'Ver Projetos',
          downloadCV: 'Download CV'
        },
        about: {
          title: 'Sobre Mim',
          description: 'Sou um desenvolvedor Back-End apaixonado por tecnologia e inovação. Com mais de 3 anos de experiência em desenvolvimento .NET, atuo atualmente na I Go Eventos desenvolvendo APIs RESTful e sistemas em tempo real. Tenho forte experiência com C#, Entity Framework, Vue.js, Node.js e práticas de DevOps. Atualmente estou iniciando meus estudos em Java + Spring Boot, JDBC, JPA, Hibernate e desenvolvimento de APIs REST.',
          skills: 'Habilidades Técnicas',
          studies: 'Estudos em Andamento',
          studiesDescription: 'Atualmente estou iniciando meus estudos em Java + Spring Boot, incluindo JDBC, JPA, Hibernate e desenvolvimento de APIs REST. Além disso, continuo aprimorando minhas habilidades em Quality Assurance (QA) com testes automatizados em NUnit, Postman, Cypress e Selenium.',
          languages: 'Idiomas',
          education: 'Formação Acadêmica',
          educationDescription: 'Minha trajetória acadêmica e cursos complementares que complementam minha formação técnica.',
          certifications: 'Certificações',
          certificationsDescription: 'Certificações e cursos que demonstram meu compromisso com o aprendizado contínuo e desenvolvimento profissional.'
        },
        experience: {
          title: 'Experiência',
          current: 'Atual',
          technologies: 'Tecnologias'
        },
        projects: {
          title: 'Projetos',
          viewCode: 'Ver Código',
          demo: 'Demo',
          automation: 'Automação de Testes QA',
          automationDesc: 'Projeto de automação de testes utilizando NUnit, Postman e Cypress. Implementação de testes automatizados para APIs e interface web.',
          filterAll: 'Todos'
        },
        contact: {
          title: 'Contato',
          subtitle: 'Vamos conversar!',
          description: 'Estou sempre aberto a novas oportunidades e colaborações.',
          formTitle: 'Envie uma mensagem',
          formName: 'Seu nome',
          formEmail: 'Seu email',
          formSubject: 'Assunto',
          formMessage: 'Sua mensagem',
          formSubmit: 'Enviar Mensagem',
          formSuccess: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
          formError: 'Erro ao enviar mensagem. Tente novamente.'
        },
        metrics: {
          yearsExperience: 'Anos de Experiência',
          projects: 'Projetos Entregues',
          technologies: 'Tecnologias Dominadas',
          certifications: 'Certificações'
        }
      },
      en: {
        nav: {
          home: 'Home',
          about: 'About',
          experience: 'Experience',
          projects: 'Projects',
          contact: 'Contact'
        },
        hero: {
          greeting: 'Hello, I am',
          subtitle: '.NET Back-End Developer',
          description: 'Specialized in RESTful API development, real-time systems with SignalR and JWT authentication. Solid experience in .NET, Entity Framework, Vue.js, Node.js and DevOps practices.',
          viewProjects: 'View Projects',
          downloadCV: 'Download CV'
        },
        about: {
          title: 'About Me',
          description: 'I am a Back-End developer passionate about technology and innovation. With more than 3 years of experience in .NET development, I currently work at I Go Eventos developing RESTful APIs and real-time systems. I have strong experience with C#, Entity Framework, Vue.js, Node.js and DevOps practices. I am currently starting my studies in Java + Spring Boot, JDBC, JPA, Hibernate and REST API development.',
          skills: 'Technical Skills',
          studies: 'Current Studies',
          studiesDescription: 'I am currently starting my studies in Java + Spring Boot, including JDBC, JPA, Hibernate and REST API development. Additionally, I continue to improve my Quality Assurance (QA) skills with automated testing in NUnit, Postman, Cypress and Selenium.',
          languages: 'Languages',
          education: 'Academic Education',
          educationDescription: 'My academic journey and complementary courses that complement my technical training.',
          certifications: 'Certifications',
          certificationsDescription: 'Certifications and courses that demonstrate my commitment to continuous learning and professional development.'
        },
        experience: {
          title: 'Experience',
          current: 'Current',
          technologies: 'Technologies'
        },
        projects: {
          title: 'Projects',
          viewCode: 'View Code',
          demo: 'Demo',
          automation: 'QA Test Automation',
          automationDesc: 'Test automation project using NUnit, Postman and Cypress. Implementation of automated tests for APIs and web interface.',
          filterAll: 'All'
        },
        contact: {
          title: 'Contact',
          subtitle: 'Let\'s talk!',
          description: 'I am always open to new opportunities and collaborations.',
          formTitle: 'Send a message',
          formName: 'Your name',
          formEmail: 'Your email',
          formSubject: 'Subject',
          formMessage: 'Your message',
          formSubmit: 'Send Message',
          formSuccess: 'Message sent successfully! I will contact you soon.',
          formError: 'Error sending message. Please try again.'
        },
        metrics: {
          yearsExperience: 'Years of Experience',
          projects: 'Projects Delivered',
          technologies: 'Technologies Mastered',
          certifications: 'Certifications'
        }
      },
      es: {
        nav: {
          home: 'Inicio',
          about: 'Sobre',
          experience: 'Experiencia',
          projects: 'Proyectos',
          contact: 'Contacto'
        },
        hero: {
          greeting: 'Hola, soy',
          subtitle: 'Desarrollador Back-End .NET',
          description: 'Especializado en desarrollo de APIs RESTful, sistemas en tiempo real con SignalR y autenticación JWT. Experiencia sólida en .NET, Entity Framework, Vue.js, Node.js y prácticas de DevOps.',
          viewProjects: 'Ver Proyectos',
          downloadCV: 'Descargar CV'
        },
        about: {
          title: 'Sobre Mí',
          description: 'Soy un desarrollador Back-End apasionado por la tecnología e innovación. Con más de 3 años de experiencia en desarrollo .NET, actualmente trabajo en I Go Eventos desarrollando APIs RESTful y sistemas en tiempo real. Tengo fuerte experiencia con C#, Entity Framework, Vue.js, Node.js y prácticas de DevOps. Actualmente estoy iniciando mis estudios en Java + Spring Boot, JDBC, JPA, Hibernate y desarrollo de APIs REST.',
          skills: 'Habilidades Técnicas',
          studies: 'Estudios en Curso',
          studiesDescription: 'Actualmente estoy iniciando mis estudios en Java + Spring Boot, incluyendo JDBC, JPA, Hibernate y desarrollo de APIs REST. Además, continúo mejorando mis habilidades en Quality Assurance (QA) con pruebas automatizadas en NUnit, Postman, Cypress y Selenium.',
          languages: 'Idiomas',
          education: 'Formación Académica',
          educationDescription: 'Mi trayectoria académica y cursos complementarios que complementan mi formación técnica.',
          certifications: 'Certificaciones',
          certificationsDescription: 'Certificaciones y cursos que demuestran mi compromiso con el aprendizaje continuo y desarrollo profesional.'
        },
        experience: {
          title: 'Experiencia',
          current: 'Actual',
          technologies: 'Tecnologías'
        },
        projects: {
          title: 'Proyectos',
          viewCode: 'Ver Código',
          demo: 'Demo',
          automation: 'Automatización de Pruebas QA',
          automationDesc: 'Proyecto de automatización de pruebas utilizando NUnit, Postman y Cypress. Implementación de pruebas automatizadas para APIs e interfaz web.',
          filterAll: 'Todos'
        },
        contact: {
          title: 'Contacto',
          subtitle: '¡Hablemos!',
          description: 'Siempre estoy abierto a nuevas oportunidades y colaboraciones.',
          formTitle: 'Envía un mensaje',
          formName: 'Tu nombre',
          formEmail: 'Tu email',
          formSubject: 'Asunto',
          formMessage: 'Tu mensaje',
          formSubmit: 'Enviar Mensaje',
          formSuccess: '¡Mensaje enviado con éxito! Te contactaré pronto.',
          formError: 'Error al enviar mensaje. Inténtalo de nuevo.'
        },
        metrics: {
          yearsExperience: 'Años de Experiencia',
          projects: 'Proyectos Entregados',
          technologies: 'Tecnologías Dominadas',
          certifications: 'Certificaciones'
        }
      }
    }

    const t = (key) => {
      const keys = key.split('.')
      let value = translations[currentLanguage.value]
      for (const k of keys) {
        value = value[k]
      }
      return value
    }

    const changeLanguage = (lang) => {
      currentLanguage.value = lang
      showLanguageDropdown.value = false
    }

    const toggleLanguageDropdown = () => {
      showLanguageDropdown.value = !showLanguageDropdown.value
    }

    const closeLanguageDropdown = () => {
      showLanguageDropdown.value = false
    }

    // Fechar dropdown quando clicar fora
    const handleClickOutside = (event) => {
      const dropdown = event.target.closest('.language-dropdown')
      if (!dropdown && showLanguageDropdown.value) {
        closeLanguageDropdown()
      }
    }

    const getCurrentLanguageName = () => {
      const lang = languageOptions.find(l => l.code === currentLanguage.value)
      return lang ? lang.name : 'Português'
    }

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value
      document.body.classList.toggle('dark-mode', isDarkMode.value)
      localStorage.setItem('darkMode', isDarkMode.value)
    }

    const submitContactForm = async () => {
      isSubmitting.value = true
      formMessage.value = null
      
      try {
        // Validar campos obrigatórios
        if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.subject || !contactForm.value.message) {
          throw new Error('Todos os campos são obrigatórios')
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(contactForm.value.email)) {
          throw new Error('Email inválido')
        }

        // Preparar dados do formulário
        const formData = {
          name: contactForm.value.name,
          email: contactForm.value.email,
          subject: contactForm.value.subject,
          message: contactForm.value.message,
          date: new Date().toISOString(),
          language: currentLanguage.value
        }

        // Escolher método baseado na configuração
        if (contactConfig.formspree.enabled) {
          await sendEmailWithFormspree(formData)
        } else if (contactConfig.emailjs.enabled) {
          await sendEmailWithEmailJS(formData)
        } else if (contactConfig.customEndpoint.enabled) {
          await sendEmailToOwnEndpoint(formData)
        } else {
          // Fallback: simular envio (apenas para demonstração)
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
        
        formMessage.value = {
          type: 'success',
          text: t('contact.formSuccess')
        }
        
        // Limpar mensagem de sucesso após 15 segundos
        setTimeout(() => {
          // Adicionar classe de fade-out
          const messageElement = document.querySelector('.form-message')
          if (messageElement) {
            messageElement.classList.add('fade-out')
            // Limpar após a animação
            setTimeout(() => {
              formMessage.value = null
            }, 300)
          } else {
            formMessage.value = null
          }
        }, 15000)
        
        // Limpar formulário
        contactForm.value = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
      } catch (error) {
        console.error('Erro ao enviar formulário:', error)
        formMessage.value = {
          type: 'error',
          text: error.message || t('contact.formError')
        }
        
        // Limpar mensagem de erro após 8 segundos
        setTimeout(() => {
          // Adicionar classe de fade-out
          const messageElement = document.querySelector('.form-message')
          if (messageElement) {
            messageElement.classList.add('fade-out')
            // Limpar após a animação
            setTimeout(() => {
              formMessage.value = null
            }, 300)
          } else {
            formMessage.value = null
          }
        }, 8000)
      } finally {
        isSubmitting.value = false
      }
    }

    // Função para enviar email via Formspree (gratuito)
    const sendEmailWithFormspree = async (formData) => {
      const endpoint = contactConfig.formspree.endpoint + contactConfig.formspree.formId
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem')
      }

      return response.json()
    }

    // Função para enviar email via EmailJS (mais profissional)
    const sendEmailWithEmailJS = async (formData) => {
      // Requer configuração do EmailJS
      // https://www.emailjs.com/
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: contactConfig.emailjs.toEmail
      }

      // await emailjs.send(
      //   contactConfig.emailjs.serviceId, 
      //   contactConfig.emailjs.templateId, 
      //   templateParams, 
      //   contactConfig.emailjs.userId
      // )
    }

    // Função para enviar para seu próprio endpoint
    const sendEmailToOwnEndpoint = async (formData) => {
      const response = await fetch(contactConfig.customEndpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem')
      }

      return response.json()
    }

    const setProjectFilter = (filter) => {
      projectFilter.value = filter
    }

    const filteredProjects = computed(() => {
      if (projectFilter.value === 'all') {
        return projects.value
      }
      
      return projects.value.filter(project => {
        const techs = project.technologies.map(tech => tech.toLowerCase())
        
        switch (projectFilter.value) {
          case 'csharp':
            return techs.some(tech => tech.includes('c#') || tech.includes('.net'))
          case 'java':
            return techs.some(tech => tech.includes('java'))
          case 'web':
            return techs.some(tech => tech.includes('javascript') || tech.includes('node.js') || tech.includes('vue.js'))
          case 'qa':
            return techs.some(tech => tech.includes('nunit') || tech.includes('postman') || tech.includes('cypress'))
          default:
            return true
        }
      })
    })

    // Adicionar e remover event listeners
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      
      // Inicializar dark mode
      const savedDarkMode = localStorage.getItem('darkMode')
      if (savedDarkMode === 'true') {
        isDarkMode.value = true
        document.body.classList.add('dark-mode')
      }
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    const skills = ref([
      { name: 'C#', level: 95 },
      { name: '.NET', level: 90 },
      { name: 'Entity Framework', level: 85 },
      { name: 'SQL Server', level: 80 },
      { name: 'Vue.js', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'Angular', level: 75 },
      { name: 'TypeScript', level: 80 },
      { name: 'JavaScript', level: 85 },
      { name: 'Azure DevOps', level: 70 },
      { name: 'SignalR', level: 75 },
      { name: 'JWT', level: 80 },
      { name: 'Git', level: 85 },
      { name: 'CI/CD', level: 75 },
      { name: 'Java + Spring Boot', level: 35 },
      { name: 'JDBC + JPA + Hibernate', level: 25 }
    ])

    const languages = ref([
      { name: 'Português', level: 'Nativo', progress: 100 },
      { name: 'Inglês', level: 'Intermediário (Estudando)', progress: 70 },
      { name: 'Espanhol', level: 'Básico', progress: 40 },
      { name: 'Francês', level: 'Básico', progress: 30 }
    ])

    const studies = ref([
      { name: 'Java + Spring Boot', status: 'Iniciando', progress: 25 },
      { name: 'JDBC + JPA + Hibernate', status: 'Iniciando', progress: 20 },
      { name: 'APIs REST com Spring', status: 'Iniciando', progress: 15 },
      { name: 'NUnit', status: 'Ativo', progress: 85 },
      { name: 'Postman', status: 'Ativo', progress: 90 },
      { name: 'Cypress', status: 'Em Progresso', progress: 60 },
      { name: 'Selenium', status: 'Em Progresso', progress: 50 }
    ])

    const certifications = ref([
      {
        id: 1,
        title: {
          pt: 'Scrum Foundation Professional Certificate (SFPC)',
          en: 'Scrum Foundation Professional Certificate (SFPC)',
          es: 'Certificado Profesional de Fundamentos de Scrum (SFPC)'
        },
        issuer: {
          pt: 'CertiProf',
          en: 'CertiProf',
          es: 'CertiProf'
        },
        date: '2019',
        icon: 'fas fa-users',
        description: {
          pt: 'Fundamentos do framework ágil Scrum, incluindo papéis, artefatos e cerimônias. Ideal para ambientes de desenvolvimento colaborativo.',
          en: 'Fundamentals of the Scrum agile framework, including roles, artifacts and ceremonies. Ideal for collaborative development environments.',
          es: 'Fundamentos del framework ágil Scrum, incluyendo roles, artefactos y ceremonias. Ideal para entornos de desarrollo colaborativo.'
        }
      },
      {
        id: 2,
        title: {
          pt: 'DevOps Essentials Professional Certificate (DEPC)',
          en: 'DevOps Essentials Professional Certificate (DEPC)',
          es: 'Certificado Profesional de Fundamentos de DevOps (DEPC)'
        },
        issuer: {
          pt: 'CertiProf',
          en: 'CertiProf',
          es: 'CertiProf'
        },
        date: '2019',
        icon: 'fas fa-infinity',
        description: {
          pt: 'Certificação em fundamentos de DevOps, pipelines, integração contínua e cultura colaborativa entre desenvolvimento e operações.',
          en: 'Certification in DevOps fundamentals, pipelines, continuous integration and collaborative culture between development and operations.',
          es: 'Certificación en fundamentos de DevOps, pipelines, integración continua y cultura colaborativa entre desarrollo y operaciones.'
        }
      },
      {
        id: 3,
        title: {
          pt: 'AWS Cloud Practitioner Essentials',
          en: 'AWS Cloud Practitioner Essentials',
          es: 'AWS Cloud Practitioner Essentials'
        },
        issuer: {
          pt: 'Amazon Web Services (AWS)',
          en: 'Amazon Web Services (AWS)',
          es: 'Amazon Web Services (AWS)'
        },
        date: '2021',
        icon: 'fab fa-aws',
        description: {
          pt: 'Fundamentos da nuvem AWS, serviços principais e práticas recomendadas para iniciantes em cloud computing.',
          en: 'AWS cloud fundamentals, core services and best practices for cloud computing beginners.',
          es: 'Fundamentos de la nube AWS, servicios principales y mejores prácticas para principiantes en computación en la nube.'
        }
      },
      {
        id: 4,
        title: {
          pt: 'Microsoft Azure Fundamentals (AZ-900)',
          en: 'Microsoft Azure Fundamentals (AZ-900)',
          es: 'Fundamentos de Microsoft Azure (AZ-900)'
        },
        issuer: {
          pt: 'Microsoft',
          en: 'Microsoft',
          es: 'Microsoft'
        },
        date: '2024',
        icon: 'fab fa-microsoft',
        description: {
          pt: 'Certificação oficial Microsoft em fundamentos da nuvem Azure, serviços principais e conceitos de cloud computing.',
          en: 'Official Microsoft certification in Azure cloud fundamentals, core services and cloud computing concepts.',
          es: 'Certificación oficial de Microsoft en fundamentos de la nube Azure, servicios principales y conceptos de computación en la nube.'
        }
      },
      {
        id: 5,
        title: {
          pt: 'Testes Automáticos + Curso COMPLETO de Teste de Software',
          en: 'Automated Tests + COMPLETE Software Testing Course',
          es: 'Pruebas Automatizadas + Curso COMPLETO de Pruebas de Software'
        },
        issuer: {
          pt: 'Udemy',
          en: 'Udemy',
          es: 'Udemy'
        },
        date: 'Julho 2025',
        icon: 'fab fa-udemy',
        description: {
          pt: 'Curso completo de testes automatizados e qualidade de software com 5 horas de conteúdo.',
          en: 'Complete automated testing and software quality course with 5 hours of content.',
          es: 'Curso completo de pruebas automatizadas y calidad de software con 5 horas de contenido.'
        }
      },
    ])

    const experience = ref([
      {
        id: 1,
        title: {
          pt: 'Desenvolvedor Back-End .NET',
          en: 'Back-End .NET Developer',
          es: 'Desarrollador Back-End .NET'
        },
        company: 'I Go Eventos',
        period: {
          pt: 'Jun 2025 - Atual',
          en: 'Jun 2025 - Current',
          es: 'Jun 2025 - Actual'
        },
        description: {
          pt: 'Responsável pelo desenvolvimento e manutenção de APIs RESTful utilizando .NET e Entity Framework. Implementação de autenticação com JWT e comunicação em tempo real com SignalR. Desenvolvimento frontend com Node.js e Vue.js.',
          en: 'Responsible for the development and maintenance of RESTful APIs using .NET and Entity Framework. Implementation of authentication with JWT and real-time communication with SignalR. Frontend development with Node.js and Vue.js.',
          es: 'Responsable del desarrollo y mantenimiento de APIs RESTful utilizando .NET y Entity Framework. Implementación de autenticación con JWT y comunicación en tiempo real con SignalR. Desarrollo frontend con Node.js y Vue.js.'
        },
        technologies: ['C#', '.NET', 'Entity Framework Core', 'SignalR', 'SQLite', 'AWS', 'JWT', 'Node.js', 'Vue.js', 'JavaScript']
      },
      {
        id: 2,
        title: {
          pt: 'Desenvolvedor Jr .NET',
          en: 'Jr .NET Developer',
          es: 'Desarrollador Jr .NET'
        },
        company: 'Tata Consultancy Services',
        period: {
          pt: 'Dez 2022 - Jun 2024',
          en: 'Dec 2022 - Jun 2024',
          es: 'Dic 2022 - Jun 2024'
        },
        description: {
          pt: 'Atuava com sustentação de sistemas e implementação de melhorias usando C# no backend e Angular no frontend. Experiência com SPA, integração de banco de dados SQL Server, e práticas modernas de DevOps. Trabalhei em ambiente ágil Scrum com sprints de 2 semanas, participando ativamente de Daily Standups, Sprint Planning, Sprint Review e Retrospectivas. Colaboração com Product Owner e Scrum Master para refinamento de backlog e estimativas de story points.',
          en: 'Worked with system maintenance and implementation of improvements using C# on the backend and Angular on the frontend. Experience with SPA, SQL Server database integration, and modern DevOps practices. Worked in Scrum agile environment with 2-week sprints, actively participating in Daily Standups, Sprint Planning, Sprint Review and Retrospectives. Collaboration with Product Owner and Scrum Master for backlog refinement and story point estimation.',
          es: 'Trabajé con mantenimiento de sistemas e implementación de mejoras usando C# en el backend y Angular en el frontend. Experiencia con SPA, integración de base de datos SQL Server, y prácticas modernas de DevOps. Trabajé en ambiente ágil Scrum con sprints de 2 semanas, participando activamente en Daily Standups, Sprint Planning, Sprint Review y Retrospectivas. Colaboración con Product Owner y Scrum Master para refinamiento de backlog y estimación de story points.'
        },
        technologies: ['C#', 'Angular', 'TypeScript', 'SQL Server', 'Azure DevOps', 'CI/CD', 'JavaScript', 'ServiceNow', 'Scrum', 'Agile', 'JIRA']
      },
      {
        id: 3,
        title: {
          pt: 'Trainee',
          en: 'Trainee',
          es: 'Trainee'
        },
        company: 'Tata Consultancy Services',
        period: {
          pt: 'Dez 2021 - Nov 2022',
          en: 'Dec 2021 - Nov 2022',
          es: 'Dic 2021 - Nov 2022'
        },
        description: {
          pt: 'Participação em projetos de modernização de aplicações legadas. Contato direto com demandas reais de clientes via ServiceNow. Execução de rotinas de análise de chamados e desenvolvimento de soluções técnicas. Início da experiência com metodologias ágeis Scrum, participando de cerimônias como Daily Standups, Sprint Planning e Sprint Review. Aprendizado sobre estimativas de tempo, definição de critérios de aceitação e trabalho colaborativo em equipe.',
          en: 'Participation in legacy application modernization projects. Direct contact with real client demands via ServiceNow. Execution of call analysis routines and development of technical solutions. Beginning of experience with Scrum agile methodologies, participating in ceremonies such as Daily Standups, Sprint Planning and Sprint Review. Learning about time estimation, definition of acceptance criteria and collaborative teamwork.',
          es: 'Participación en proyectos de modernización de aplicaciones legacy. Contacto directo con demandas reales de clientes vía ServiceNow. Ejecución de rutinas de análisis de llamados y desarrollo de soluciones técnicas. Inicio de la experiencia con metodologías ágiles Scrum, participando en ceremonias como Daily Standups, Sprint Planning y Sprint Review. Aprendizaje sobre estimación de tiempo, definición de criterios de aceptación y trabajo colaborativo en equipo.'
        },
        technologies: ['JavaScript', 'C#', 'ServiceNow', 'CI/CD', 'Azure', 'Scrum', 'Agile', 'Daily Standups']
      },
      {
        id: 4,
        title: {
          pt: 'Estagiário em Programação',
          en: 'Programming Intern',
          es: 'Pasante en Programación'
        },
        company: 'Tata Consultancy Services',
        period: {
          pt: 'Jul 2021 - Dez 2021',
          en: 'Jul 2021 - Dec 2021',
          es: 'Jul 2021 - Dic 2021'
        },
        description: {
          pt: 'Primeira experiência prática com projetos de grande porte. Suporte no desenvolvimento de funcionalidades com foco em backend. Aprendizado de metodologias ágeis e ferramentas corporativas.',
          en: 'First practical experience with large-scale projects. Support in feature development with focus on backend. Learning of agile methodologies and corporate tools.',
          es: 'Primera experiencia práctica con proyectos de gran escala. Soporte en el desarrollo de funcionalidades con enfoque en backend. Aprendizaje de metodologías ágiles y herramientas corporativas.'
        },
        technologies: ['C#', 'SQLite', 'Git', 'Scrum', 'Java']
      },
      {
        id: 5,
        title: {
          pt: 'Mecânico Montador',
          en: 'Assembly Mechanic',
          es: 'Mecánico Ensamblador'
        },
        company: 'PJFREIOS',
        period: {
          pt: 'Jan 2018 - Fev 2020',
          en: 'Jan 2018 - Feb 2020',
          es: 'Ene 2018 - Feb 2020'
        },
        description: {
          pt: 'Atuei com montagem e desmontagem de válvulas de peças de freio em ambiente fabril. Essa experiência me proporcionou disciplina, atenção aos detalhes, leitura de processos técnicos e trabalho sob normas rígidas de segurança. Desenvolvi habilidades como raciocínio lógico, resolução prática de problemas e trabalho em equipe.',
          en: 'Worked with assembly and disassembly of brake valve parts in a manufacturing environment. This experience provided me with discipline, attention to detail, reading of technical processes and work under strict safety standards. I developed skills such as logical reasoning, practical problem solving and teamwork.',
          es: 'Trabajé con ensamblaje y desensamblaje de válvulas de piezas de freno en ambiente fabril. Esta experiencia me proporcionó disciplina, atención a los detalles, lectura de procesos técnicos y trabajo bajo normas rígidas de seguridad. Desarrollé habilidades como razonamiento lógico, resolución práctica de problemas y trabajo en equipo.'
        },
        technologies: ['Disciplina', 'Precisão técnica', 'Segurança industrial', 'Trabalho em equipe']
      }
    ])

    const education = ref([
      {
        id: 1,
        title: {
          pt: 'Análise e Desenvolvimento de Sistemas',
          en: 'Systems Analysis and Development',
          es: 'Análisis y Desarrollo de Sistemas'
        },
        institution: {
          pt: 'Faculdade Anhanguera',
          en: 'Anhanguera College',
          es: 'Facultad Anhanguera'
        },
        period: {
          pt: '2025 - 2027 (2º Semestre)',
          en: '2025 - 2027 (2nd Semester)',
          es: '2025 - 2027 (2º Semestre)'
        },
        icon: 'fas fa-graduation-cap',
                  description: {
            pt: 'Graduação em Análise e Desenvolvimento de Sistemas. Iniciada em 2025, atualmente no segundo semestre, com previsão de conclusão em junho de 2027. Foco em desenvolvimento de software, programação orientada a objetos e tecnologias web.',
            en: 'Bachelor\'s degree in Systems Analysis and Development. Started in 2025, currently in the second semester, with expected completion in June 2027. Focus on software development, object-oriented programming and web technologies.',
            es: 'Licenciatura en Análisis y Desarrollo de Sistemas. Iniciada en 2025, actualmente en el segundo semestre, con previsión de conclusión en junio de 2027. Enfoque en desarrollo de software, programación orientada a objetos y tecnologías web.'
          }
      },
      {
        id: 2,
        title: {
          pt: 'Curso de Inglês',
          en: 'English Course',
          es: 'Curso de Inglés'
        },
        institution: {
          pt: 'Mairo Vergara',
          en: 'Mairo Vergara',
          es: 'Mairo Vergara'
        },
        period: {
          pt: 'Em andamento',
          en: 'In progress',
          es: 'En progreso'
        },
        icon: 'fas fa-language',
        description: {
          pt: 'Curso de inglês com metodologia inovadora do professor Mairo Vergara. Foco em conversação, gramática e preparação para certificações internacionais.',
          en: 'English course with innovative methodology by Professor Mairo Vergara. Focus on conversation, grammar and preparation for international certifications.',
          es: 'Curso de inglés con metodología innovadora del profesor Mairo Vergara. Enfoque en conversación, gramática y preparación para certificaciones internacionales.'
        }
      }
    ])

    const projects = ref([
      {
        id: 1,
        title: {
          pt: 'Projetos Wesley',
          en: 'Wesley Projects',
          es: 'Proyectos Wesley'
        },
        description: {
          pt: 'Repositório principal com projetos desenvolvidos em C# e .NET, incluindo aplicações web e APIs.',
          en: 'Main repository with projects developed in C# and .NET, including web applications and APIs.',
          es: 'Repositorio principal con proyectos desarrollados en C# y .NET, incluyendo aplicaciones web y APIs.'
        },
        technologies: ['C#', '.NET', 'Entity Framework', 'SQL Server'],
        github: 'https://github.com/wmarlon1801/ProjetosWesley',
        live: null,
        icon: 'fas fa-rocket'
      },
      {
        id: 2,
        title: {
          pt: 'Web Application API',
          en: 'Web Application API',
          es: 'API de Aplicación Web'
        },
        description: {
          pt: 'Desenvolvimento de API para projeto home, utilizando JavaScript e tecnologias web modernas.',
          en: 'API development for home project, using JavaScript and modern web technologies.',
          es: 'Desarrollo de API para proyecto home, utilizando JavaScript y tecnologías web modernas.'
        },
        technologies: ['JavaScript', 'Node.js', 'API', 'Web Development'],
        github: 'https://github.com/wmarlon1801/WebApplicationAPI',
        live: null,
        icon: 'fas fa-globe'
      },
      {
        id: 3,
        title: {
          pt: 'CRUD Básico de Contatos',
          en: 'Basic Contact CRUD',
          es: 'CRUD Básico de Contactos'
        },
        description: {
          pt: 'Sistema de gerenciamento de contatos desenvolvido em .NET com operações CRUD completas.',
          en: 'Contact management system developed in .NET with complete CRUD operations.',
          es: 'Sistema de gestión de contactos desarrollado en .NET con operaciones CRUD completas.'
        },
        technologies: ['C#', '.NET', 'CRUD', 'SQL Server'],
        github: 'https://github.com/wmarlon1801/CRUD-basico-de-contatos-DotNET',
        live: null,
        icon: 'fas fa-database'
      },
      {
        id: 4,
        title: {
          pt: 'Controle de Contatos',
          en: 'Contact Control',
          es: 'Control de Contactos'
        },
        description: {
          pt: 'Aplicação para controle e gerenciamento de contatos com interface intuitiva.',
          en: 'Application for contact control and management with intuitive interface.',
          es: 'Aplicación para control y gestión de contactos con interfaz intuitiva.'
        },
        technologies: ['C#', '.NET', 'Windows Forms', 'SQL Server'],
        github: 'https://github.com/wmarlon1801/ControleDeContatos',
        live: null,
        icon: 'fas fa-address-book'
      },
      {
        id: 5,
        title: {
          pt: 'Avaliação CRUD Java',
          en: 'Java CRUD Assessment',
          es: 'Evaluación CRUD Java'
        },
        description: {
          pt: 'Sistema CRUD desenvolvido em Java com NetBeans, demonstrando conhecimentos em desenvolvimento Java.',
          en: 'CRUD system developed in Java with NetBeans, demonstrating knowledge in Java development.',
          es: 'Sistema CRUD desarrollado en Java con NetBeans, demostrando conocimientos en desarrollo Java.'
        },
        technologies: ['Java', 'NetBeans', 'CRUD', 'MySQL'],
        github: 'https://github.com/wmarlon1801/Avalia-o-CRUD',
        live: null,
        icon: 'fab fa-java'
      },
      {
        id: 6,
        title: {
          pt: 'Automação de Testes QA',
          en: 'QA Test Automation',
          es: 'Automatización de Pruebas QA'
        },
        description: {
          pt: 'Projeto de automação de testes utilizando NUnit, Postman e Cypress. Implementação de testes automatizados para APIs e interface web.',
          en: 'Test automation project using NUnit, Postman and Cypress. Implementation of automated tests for APIs and web interface.',
          es: 'Proyecto de automatización de pruebas utilizando NUnit, Postman y Cypress. Implementación de pruebas automatizadas para APIs e interfaz web.'
        },
        technologies: ['NUnit', 'Postman', 'Cypress', 'C#', 'JavaScript', 'API Testing'],
        github: 'https://github.com/wmarlon1801/automacao-testes-qa',
        live: null,
        icon: 'fas fa-bug'
      }
    ])

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      
      // Fechar menu mobile após clicar
      const navMenu = document.querySelector('.nav-menu')
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active')
      }
    }

    const downloadCV = () => {
      const link = document.createElement('a')
      link.href = '/cv-wesley.pdf'
      link.download = 'Wesley-Santos-CV.pdf'
      link.click()
    }

    const toggleMenu = () => {
      const navMenu = document.querySelector('.nav-menu')
      navMenu.classList.toggle('active')
    }

    return {
      currentLanguage,
      showLanguageDropdown,
      languageOptions,
      t,
      changeLanguage,
      toggleLanguageDropdown,
      getCurrentLanguageName,
      toggleTheme,
      isDarkMode,
      contactForm,
      isSubmitting,
      formMessage,
      submitContactForm,
      setProjectFilter,
      projectFilter,
      filteredProjects,
      skills,
      languages,
      studies,
      education,
      certifications,
      experience,
      projects,
      scrollToSection,
      downloadCV,
      toggleMenu
    }
  }
}
</script> 