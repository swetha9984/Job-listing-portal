import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create sample employers
  const employers = [
    {
      companyName: 'TechCorp Solutions',
      website: 'https://techcorp.example.com',
      description: 'Leading technology company specializing in cloud solutions and enterprise software.',
    },
    {
      companyName: 'StartupXYZ',
      website: 'https://startupxyz.example.com',
      description: 'Fast-growing startup revolutionizing the fintech industry with innovative solutions.',
    },
    {
      companyName: 'Global Innovations Inc',
      website: 'https://globalinnovations.example.com',
      description: 'Fortune 500 company focused on AI and machine learning technologies.',
    },
    {
      companyName: 'Digital Dynamics',
      website: 'https://digitaldynamics.example.com',
      description: 'Creative digital agency building amazing web and mobile experiences.',
    },
    {
      companyName: 'CloudFirst Technologies',
      website: 'https://cloudfirst.example.com',
      description: 'Cloud infrastructure provider helping businesses scale globally.',
    },
  ]

  // Create users and employer profiles
  const employerProfiles = []
  for (let i = 0; i < employers.length; i++) {
    const user = await prisma.user.create({
      data: {
        clerkId: `seed_employer_${i + 1}`,
        email: `employer${i + 1}@example.com`,
        role: 'EMPLOYER',
      },
    })

    const profile = await prisma.employerProfile.create({
      data: {
        userId: user.id,
        ...employers[i],
      },
    })

    employerProfiles.push(profile)
    console.log(`✅ Created employer: ${employers[i].companyName}`)
  }

  // Create 25 diverse job listings
  const jobs = [
    {
      title: 'Senior Full Stack Developer',
      description: `We are seeking an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies.

Key Responsibilities:
• Design and develop scalable web applications
• Collaborate with cross-functional teams
• Write clean, maintainable code
• Participate in code reviews
• Mentor junior developers

What We Offer:
• Competitive salary and benefits
• Remote work flexibility
• Professional development opportunities
• Modern tech stack
• Collaborative team environment`,
      location: 'San Francisco, CA',
      salaryMin: 120000,
      salaryMax: 180000,
      jobType: 'FULL_TIME',
      requirements: `Required Skills:
• 5+ years of experience in full stack development
• Strong proficiency in JavaScript/TypeScript
• Experience with React, Node.js, and PostgreSQL
• Knowledge of cloud platforms (AWS/Azure)
• Excellent problem-solving skills
• Strong communication abilities

Preferred:
• Experience with microservices architecture
• Knowledge of Docker and Kubernetes
• Familiarity with CI/CD pipelines`,
    },
    {
      title: 'Frontend Developer (React)',
      description: `Join our team as a Frontend Developer and help build beautiful, responsive user interfaces that delight our customers.

About the Role:
We're looking for a passionate frontend developer who loves creating pixel-perfect UIs and has a keen eye for design. You'll work closely with our design team to bring mockups to life.

Responsibilities:
• Build responsive web applications using React
• Implement designs with attention to detail
• Optimize applications for performance
• Collaborate with backend developers
• Write unit and integration tests`,
      location: 'New York, NY',
      salaryMin: 90000,
      salaryMax: 130000,
      jobType: 'FULL_TIME',
      requirements: `Must Have:
• 3+ years of React experience
• Strong HTML, CSS, and JavaScript skills
• Experience with state management (Redux/Context)
• Understanding of responsive design
• Git version control

Nice to Have:
• TypeScript experience
• Next.js knowledge
• Testing with Jest/React Testing Library
• UI/UX design skills`,
    },
    {
      title: 'Backend Engineer (Node.js)',
      description: `We're looking for a talented Backend Engineer to design and build scalable APIs and services that power our platform.

What You'll Do:
• Design and implement RESTful APIs
• Build microservices architecture
• Optimize database queries and performance
• Implement security best practices
• Work with DevOps on deployment strategies

Why Join Us:
• Work on challenging technical problems
• Latest technologies and tools
• Flexible work arrangements
• Great team culture
• Competitive compensation`,
      location: 'Austin, TX',
      salaryMin: 100000,
      salaryMax: 150000,
      jobType: 'FULL_TIME',
      requirements: `Requirements:
• 4+ years of Node.js development
• Strong understanding of async programming
• Experience with Express or similar frameworks
• Database design skills (SQL and NoSQL)
• RESTful API design principles
• Understanding of authentication/authorization

Bonus Points:
• GraphQL experience
• Message queue systems (RabbitMQ, Kafka)
• Microservices architecture
• AWS or GCP experience`,
    },
    {
      title: 'DevOps Engineer',
      description: `Seeking a DevOps Engineer to help us build and maintain our cloud infrastructure and deployment pipelines.

Role Overview:
You'll be responsible for automating our infrastructure, improving our CI/CD pipelines, and ensuring our systems are reliable and scalable.

Key Duties:
• Manage cloud infrastructure (AWS/Azure/GCP)
• Build and maintain CI/CD pipelines
• Implement monitoring and alerting
• Automate deployment processes
• Ensure system security and compliance
• Troubleshoot production issues`,
      location: 'Seattle, WA',
      salaryMin: 110000,
      salaryMax: 160000,
      jobType: 'FULL_TIME',
      requirements: `Required:
• 3+ years of DevOps experience
• Strong Linux/Unix skills
• Experience with Docker and Kubernetes
• CI/CD tools (Jenkins, GitLab CI, GitHub Actions)
• Infrastructure as Code (Terraform, CloudFormation)
• Scripting skills (Bash, Python)

Preferred:
• AWS/Azure/GCP certifications
• Experience with monitoring tools (Prometheus, Grafana)
• Security best practices
• Database administration`,
    },
    {
      title: 'Mobile Developer (React Native)',
      description: `Join our mobile team to build cross-platform applications that reach millions of users worldwide.

About the Position:
We're building the next generation of mobile experiences and need talented developers who are passionate about mobile development.

What You'll Build:
• Cross-platform mobile applications
• Reusable component libraries
• Integration with native modules
• Performance optimizations
• Offline-first features`,
      location: 'Remote',
      salaryMin: 95000,
      salaryMax: 140000,
      jobType: 'REMOTE',
      requirements: `Must Have:
• 3+ years of React Native experience
• Strong JavaScript/TypeScript skills
• Experience with mobile app deployment
• Understanding of mobile UI/UX patterns
• REST API integration

Nice to Have:
• Native iOS/Android development
• Redux or MobX experience
• Push notifications implementation
• App Store optimization knowledge`,
    },
    {
      title: 'Data Scientist',
      description: `We're looking for a Data Scientist to help us extract insights from data and build machine learning models.

Role Description:
You'll work with large datasets to identify patterns, build predictive models, and help drive data-driven decision making across the organization.

Responsibilities:
• Analyze complex datasets
• Build and deploy ML models
• Create data visualizations
• Collaborate with engineering teams
• Present findings to stakeholders`,
      location: 'Boston, MA',
      salaryMin: 115000,
      salaryMax: 170000,
      jobType: 'FULL_TIME',
      requirements: `Required Skills:
• Master's or PhD in related field
• 3+ years of data science experience
• Strong Python skills (pandas, scikit-learn)
• Statistical analysis and modeling
• SQL and database knowledge
• Data visualization (Matplotlib, Plotly)

Preferred:
• Deep learning frameworks (TensorFlow, PyTorch)
• Big data tools (Spark, Hadoop)
• Cloud ML platforms
• A/B testing experience`,
    },
    {
      title: 'UI/UX Designer',
      description: `Seeking a creative UI/UX Designer to craft beautiful and intuitive user experiences for our products.

About the Role:
You'll be responsible for the entire design process from research to final implementation, working closely with product and engineering teams.

What You'll Do:
• Conduct user research and testing
• Create wireframes and prototypes
• Design user interfaces
• Develop design systems
• Collaborate with developers
• Iterate based on feedback`,
      location: 'Los Angeles, CA',
      salaryMin: 85000,
      salaryMax: 125000,
      jobType: 'FULL_TIME',
      requirements: `Requirements:
• 4+ years of UI/UX design experience
• Strong portfolio demonstrating design skills
• Proficiency in Figma or Sketch
• Understanding of design principles
• User research methodologies
• Prototyping skills

Bonus:
• HTML/CSS knowledge
• Motion design skills
• Accessibility standards (WCAG)
• Design system experience`,
    },
    {
      title: 'Product Manager',
      description: `Join us as a Product Manager to drive the vision and execution of our product roadmap.

Position Overview:
You'll work with cross-functional teams to define product strategy, prioritize features, and ensure successful product launches.

Key Responsibilities:
• Define product vision and strategy
• Manage product roadmap
• Gather and prioritize requirements
• Work with engineering and design
• Analyze product metrics
• Communicate with stakeholders`,
      location: 'Chicago, IL',
      salaryMin: 120000,
      salaryMax: 175000,
      jobType: 'FULL_TIME',
      requirements: `Must Have:
• 5+ years of product management experience
• Strong analytical skills
• Excellent communication abilities
• Experience with agile methodologies
• Data-driven decision making
• Stakeholder management

Preferred:
• Technical background
• B2B SaaS experience
• SQL knowledge
• MBA or equivalent`,
    },
    {
      title: 'QA Engineer',
      description: `We're hiring a QA Engineer to ensure the quality and reliability of our software products.

Role Summary:
You'll be responsible for designing test strategies, writing automated tests, and working with developers to maintain high quality standards.

Responsibilities:
• Design and execute test plans
• Write automated tests
• Perform manual testing
• Report and track bugs
• Collaborate with development team
• Improve QA processes`,
      location: 'Denver, CO',
      salaryMin: 75000,
      salaryMax: 110000,
      jobType: 'FULL_TIME',
      requirements: `Required:
• 3+ years of QA experience
• Test automation skills (Selenium, Cypress)
• Understanding of testing methodologies
• Bug tracking tools (Jira)
• API testing experience
• Attention to detail

Nice to Have:
• Programming skills (JavaScript, Python)
• Performance testing
• Security testing
• CI/CD integration`,
    },
    {
      title: 'Marketing Manager',
      description: `Seeking an experienced Marketing Manager to lead our marketing initiatives and drive growth.

About the Position:
You'll develop and execute marketing strategies across multiple channels to increase brand awareness and generate leads.

What You'll Do:
• Develop marketing strategies
• Manage marketing campaigns
• Analyze campaign performance
• Lead marketing team
• Manage marketing budget
• Collaborate with sales team`,
      location: 'Miami, FL',
      salaryMin: 90000,
      salaryMax: 130000,
      jobType: 'FULL_TIME',
      requirements: `Requirements:
• 5+ years of marketing experience
• Digital marketing expertise
• Strong analytical skills
• Team leadership experience
• Budget management
• Excellent communication

Preferred:
• B2B marketing experience
• Marketing automation tools
• SEO/SEM knowledge
• Content marketing
• Social media marketing`,
    },
    {
      title: 'Sales Representative',
      description: `Join our sales team to help businesses discover and adopt our innovative solutions.

Role Description:
You'll be responsible for generating new business, managing client relationships, and achieving sales targets.

Responsibilities:
• Prospect and qualify leads
• Conduct product demonstrations
• Negotiate contracts
• Manage sales pipeline
• Meet sales quotas
• Provide customer support`,
      location: 'Dallas, TX',
      salaryMin: 60000,
      salaryMax: 100000,
      jobType: 'FULL_TIME',
      requirements: `Must Have:
• 2+ years of B2B sales experience
• Proven track record of meeting quotas
• Strong communication skills
• CRM experience (Salesforce)
• Negotiation skills
• Self-motivated

Bonus:
• SaaS sales experience
• Technical background
• Industry knowledge
• Existing network`,
    },
    {
      title: 'Customer Success Manager',
      description: `We're looking for a Customer Success Manager to ensure our clients achieve their goals with our platform.

Position Overview:
You'll be the primary point of contact for customers, helping them maximize value from our products and services.

Key Duties:
• Onboard new customers
• Provide ongoing support
• Identify upsell opportunities
• Gather customer feedback
• Reduce churn
• Build strong relationships`,
      location: 'Remote',
      salaryMin: 70000,
      salaryMax: 105000,
      jobType: 'REMOTE',
      requirements: `Required:
• 3+ years in customer success
• Strong interpersonal skills
• Problem-solving abilities
• Technical aptitude
• CRM proficiency
• Data analysis skills

Preferred:
• SaaS experience
• Account management background
• Project management skills
• Industry certifications`,
    },
    {
      title: 'Content Writer',
      description: `Seeking a talented Content Writer to create engaging content for our blog, website, and marketing materials.

About the Role:
You'll research, write, and edit various types of content to engage our audience and support our marketing goals.

Responsibilities:
• Write blog posts and articles
• Create marketing copy
• Edit and proofread content
• Conduct research
• Optimize for SEO
• Collaborate with marketing team`,
      location: 'Portland, OR',
      salaryMin: 55000,
      salaryMax: 80000,
      jobType: 'FULL_TIME',
      requirements: `Must Have:
• 2+ years of content writing experience
• Excellent writing and editing skills
• SEO knowledge
• Research abilities
• Attention to detail
• Portfolio of published work

Nice to Have:
• Technical writing experience
• WordPress or CMS experience
• Social media content creation
• Basic HTML knowledge`,
    },
    {
      title: 'Graphic Designer',
      description: `Join our creative team as a Graphic Designer to create stunning visual content for digital and print media.

Role Summary:
You'll design graphics for various platforms including websites, social media, marketing materials, and product interfaces.

What You'll Create:
• Marketing materials
• Social media graphics
• Website designs
• Brand assets
• Presentations
• Print materials`,
      location: 'Phoenix, AZ',
      salaryMin: 60000,
      salaryMax: 90000,
      jobType: 'FULL_TIME',
      requirements: `Requirements:
• 3+ years of graphic design experience
• Strong portfolio
• Adobe Creative Suite proficiency
• Typography and color theory
• Brand identity design
• Print and digital design

Bonus:
• Motion graphics skills
• UI design experience
• Photography skills
• Video editing`,
    },
    {
      title: 'Business Analyst',
      description: `We're hiring a Business Analyst to bridge the gap between business needs and technical solutions.

Position Description:
You'll analyze business processes, gather requirements, and work with stakeholders to improve operations and systems.

Responsibilities:
• Analyze business processes
• Gather and document requirements
• Create process flows
• Facilitate meetings
• Support project implementation
• Provide recommendations`,
      location: 'Atlanta, GA',
      salaryMin: 75000,
      salaryMax: 110000,
      jobType: 'FULL_TIME',
      requirements: `Required:
• 3+ years as business analyst
• Requirements gathering skills
• Process modeling
• Stakeholder management
• Documentation skills
• Analytical thinking

Preferred:
• SQL knowledge
• Agile/Scrum experience
• Industry certifications (CBAP)
• Project management skills`,
    },
    {
      title: 'HR Manager',
      description: `Seeking an HR Manager to lead our human resources initiatives and support our growing team.

About the Position:
You'll oversee all HR functions including recruitment, employee relations, benefits administration, and compliance.

Key Responsibilities:
• Manage recruitment process
• Handle employee relations
• Administer benefits programs
• Ensure compliance
• Develop HR policies
• Support organizational development`,
      location: 'Philadelphia, PA',
      salaryMin: 80000,
      salaryMax: 120000,
      jobType: 'FULL_TIME',
      requirements: `Must Have:
• 5+ years of HR experience
• Strong knowledge of employment law
• HRIS experience
• Excellent communication skills
• Conflict resolution abilities
• Organizational skills

Preferred:
• SHRM or HRCI certification
• Experience in tech industry
• Change management experience
• Talent development background`,
    },
    {
      title: 'Financial Analyst',
      description: `Join our finance team as a Financial Analyst to support strategic decision-making through data analysis and financial modeling.

Role Overview:
You'll analyze financial data, create forecasts, and provide insights to support business planning and growth.

Responsibilities:
• Perform financial analysis
• Create financial models
• Prepare reports and presentations
• Support budgeting process
• Analyze business performance
• Provide recommendations`,
      location: 'Charlotte, NC',
      salaryMin: 70000,
      salaryMax: 105000,
      jobType: 'FULL_TIME',
      requirements: `Required:
• Bachelor's in Finance or Accounting
• 2+ years of financial analysis
• Strong Excel skills
• Financial modeling experience
• Analytical thinking
• Attention to detail

Preferred:
• CFA or CPA certification
• SQL knowledge
• BI tools experience (Tableau, Power BI)
• Industry experience`,
    },
    {
      title: 'Cybersecurity Specialist',
      description: `We're looking for a Cybersecurity Specialist to protect our systems and data from security threats.

Position Summary:
You'll implement security measures, monitor for threats, and respond to security incidents to keep our infrastructure secure.

Key Duties:
• Monitor security systems
• Conduct security assessments
• Implement security controls
• Respond to incidents
• Develop security policies
• Provide security training`,
      location: 'Washington, DC',
      salaryMin: 95000,
      salaryMax: 145000,
      jobType: 'FULL_TIME',
      requirements: `Must Have:
• 3+ years in cybersecurity
• Security certifications (CISSP, CEH)
• Network security knowledge
• Incident response experience
• Security tools proficiency
• Risk assessment skills

Nice to Have:
• Cloud security experience
• Penetration testing skills
• Compliance knowledge (SOC 2, ISO 27001)
• Programming skills`,
    },
    {
      title: 'Project Manager',
      description: `Seeking an experienced Project Manager to lead cross-functional projects and ensure successful delivery.

About the Role:
You'll plan, execute, and close projects while managing scope, timeline, budget, and stakeholder expectations.

Responsibilities:
• Define project scope and objectives
• Create project plans
• Manage project resources
• Track progress and milestones
• Manage risks and issues
• Communicate with stakeholders`,
      location: 'San Diego, CA',
      salaryMin: 90000,
      salaryMax: 135000,
      jobType: 'FULL_TIME',
      requirements: `Requirements:
• 5+ years of project management
• PMP certification preferred
• Agile/Scrum experience
• Strong leadership skills
• Excellent communication
• Risk management

Bonus:
• Technical background
• Multiple project management
• Change management
• Budget management`,
    },
    {
      title: 'Data Engineer',
      description: `Join our data team as a Data Engineer to build and maintain data pipelines and infrastructure.

Role Description:
You'll design and implement scalable data solutions to support analytics and machine learning initiatives.

What You'll Build:
• Data pipelines and ETL processes
• Data warehouses
• Real-time data streaming
• Data quality frameworks
• Integration with various data sources
• Monitoring and alerting systems`,
      location: 'San Jose, CA',
      salaryMin: 110000,
      salaryMax: 165000,
      jobType: 'FULL_TIME',
      requirements: `Required:
• 3+ years of data engineering
• Strong SQL skills
• Python or Scala programming
• ETL/ELT experience
• Data warehouse design
• Big data technologies

Preferred:
• Spark, Kafka, Airflow
• Cloud platforms (AWS, GCP, Azure)
• Data modeling
• NoSQL databases`,
    },
    {
      title: 'Technical Writer',
      description: `We're hiring a Technical Writer to create clear and comprehensive documentation for our products and APIs.

Position Overview:
You'll work with engineers and product teams to document features, APIs, and processes for both internal and external audiences.

Responsibilities:
• Write technical documentation
• Create API documentation
• Develop user guides
• Maintain knowledge base
• Create video tutorials
• Collaborate with engineering`,
      location: 'Remote',
      salaryMin: 65000,
      salaryMax: 95000,
      jobType: 'REMOTE',
      requirements: `Must Have:
• 2+ years of technical writing
• Strong writing skills
• Technical aptitude
• Documentation tools experience
• Ability to explain complex concepts
• Attention to detail

Nice to Have:
• Programming knowledge
• API documentation experience
• Video creation skills
• Markdown/Git proficiency`,
    },
    {
      title: 'Machine Learning Engineer',
      description: `Seeking a Machine Learning Engineer to develop and deploy ML models that power our intelligent features.

About the Position:
You'll work on cutting-edge ML projects, from research to production deployment, collaborating with data scientists and engineers.

Key Responsibilities:
• Design and implement ML models
• Deploy models to production
• Optimize model performance
• Build ML infrastructure
• Conduct experiments
• Monitor model performance`,
      location: 'Palo Alto, CA',
      salaryMin: 130000,
      salaryMax: 200000,
      jobType: 'FULL_TIME',
      requirements: `Required:
• Master's or PhD in CS/ML
• 3+ years of ML engineering
• Strong Python skills
• Deep learning frameworks
• MLOps experience
• Cloud platforms

Preferred:
• Published research
• Computer vision or NLP
• Distributed training
• Model optimization
• Production ML systems`,
    },
    {
      title: 'Solutions Architect',
      description: `Join us as a Solutions Architect to design and implement technical solutions for our enterprise clients.

Role Summary:
You'll work with clients to understand their needs and design scalable, secure solutions using our platform and technologies.

What You'll Do:
• Design technical solutions
• Create architecture diagrams
• Provide technical guidance
• Support pre-sales activities
• Conduct technical workshops
• Ensure best practices`,
      location: 'Raleigh, NC',
      salaryMin: 120000,
      salaryMax: 175000,
      jobType: 'FULL_TIME',
      requirements: `Must Have:
• 7+ years of technical experience
• Solution architecture experience
• Cloud architecture knowledge
• Strong communication skills
• Enterprise software experience
• Technical leadership

Preferred:
• Cloud certifications
• Multiple technology stacks
• Integration patterns
• Security best practices`,
    },
    {
      title: 'Scrum Master',
      description: `We're looking for a Scrum Master to facilitate agile processes and help our teams deliver high-quality software.

Position Description:
You'll coach teams on agile practices, remove impediments, and ensure smooth sprint execution.

Responsibilities:
• Facilitate scrum ceremonies
• Coach teams on agile practices
• Remove blockers
• Track team metrics
• Foster collaboration
• Continuous improvement`,
      location: 'Minneapolis, MN',
      salaryMin: 85000,
      salaryMax: 125000,
      jobType: 'FULL_TIME',
      requirements: `Required:
• 3+ years as Scrum Master
• CSM or PSM certification
• Strong facilitation skills
• Agile methodologies knowledge
• Conflict resolution
• Servant leadership

Bonus:
• Technical background
• Multiple team experience
• Agile coaching
• Jira expertise`,
    },
    {
      title: 'IT Support Specialist',
      description: `Seeking an IT Support Specialist to provide technical support to our employees and maintain IT infrastructure.

About the Role:
You'll troubleshoot technical issues, manage IT assets, and ensure smooth operation of our technology systems.

Key Duties:
• Provide technical support
• Troubleshoot hardware/software issues
• Manage IT assets
• Set up new equipment
• Maintain documentation
• Support remote employees`,
      location: 'Nashville, TN',
      salaryMin: 50000,
      salaryMax: 75000,
      jobType: 'FULL_TIME',
      requirements: `Must Have:
• 2+ years of IT support experience
• Windows and Mac OS knowledge
• Networking basics
• Ticketing systems
• Customer service skills
• Problem-solving abilities

Nice to Have:
• CompTIA A+ certification
• Active Directory experience
• Cloud services (Office 365, Google Workspace)
• Scripting skills`,
    },
  ]

  // Distribute jobs among employers
  for (let i = 0; i < jobs.length; i++) {
    const employerProfile = employerProfiles[i % employerProfiles.length]
    
    await prisma.job.create({
      data: {
        employerId: employerProfile.id,
        ...jobs[i],
        status: 'ACTIVE',
      },
    })

    console.log(`✅ Created job: ${jobs[i].title}`)
  }

  console.log('🎉 Database seeded successfully!')
  console.log(`📊 Created ${employerProfiles.length} employers and ${jobs.length} jobs`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
