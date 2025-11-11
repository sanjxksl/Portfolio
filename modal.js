// ==========================================
// PROJECT MODAL
// Handles project detail popups
// ==========================================

// Project data
const projectData = {
    'ashok-leyland': {
        title: 'Product Intern',
        company: 'Ashok Leyland',
        date: 'Jul 2024 - Sep 2024',
        tags: ['Data Analytics', 'Automation', 'Product Strategy'],
        github: null,
        content: `
            <div class="modal-section">
                <h2>The Problem</h2>
                <p>Ashok Leyland's R&D team needed to predict engine performance across different operating conditions without running expensive physical tests for every configuration. Engine testing requires significant time and resources—testing beds, fuel consumption, instrumentation, and engineering hours.</p>
            </div>

            <div class="modal-section">
                <h2>What I Did</h2>

                <h3>Built 1D Engine Simulation Model (GT Power)</h3>
                <ul>
                    <li>Developed thermodynamic simulation model for H64v 6-cylinder, 4-valve engine (250 HP and 280 HP configurations)</li>
                    <li>Modeled complete engine system including turbochargers, intercoolers, EGR systems, fuel injection, and exhaust manifolds</li>
                    <li>Used GT Suite software for predictive engine performance analysis</li>
                </ul>

                <h3>Steady-State Modeling & Calibration</h3>
                <ul>
                    <li>Full-Throttle Position (FTP): Validated across 800-2600 RPM range</li>
                    <li>Part-Throttle Position (PTP): Validated at 10 different load points across multiple speeds</li>
                    <li>Calibrated injection rate maps, pressure-temperature curves, and combustion parameters</li>
                    <li>Matched simulation pressures/temperatures with test bed data at key measurement points</li>
                </ul>

                <h3>Transient Modeling</h3>
                <ul>
                    <li>Simulated dynamic engine behavior under changing speed and load conditions</li>
                    <li>Validated model across duty cycles: T90, Sweep, Lug, WHTC</li>
                    <li>Integrated ECU maps (boost pressure, injection parameters, EGR, thermal management)</li>
                </ul>

                <h3>Parametric Studies</h3>
                <ul>
                    <li>Investigated impact of compression ratios, valve lifts, injection timing on power and efficiency</li>
                    <li>Supported design optimization decisions for 280 HP engine variant</li>
                </ul>
            </div>

            <div class="modal-highlight">
                <h3>Results</h3>
                <p><strong>Steady-State Accuracy:</strong></p>
                <ul>
                    <li>Brake Torque: ±3% error</li>
                    <li>Boost Pressure: ±0.2 bar error</li>
                    <li>BSFC (fuel consumption): ±5% deviation</li>
                    <li>Achieved target accuracy of >97% across all key parameters</li>
                </ul>
                <p><strong>Transient Accuracy:</strong></p>
                <ul>
                    <li>T90 Timing: 0.3s max error</li>
                    <li>Brake Torque & BSFC: ±4% deviation</li>
                </ul>
                <p><strong>Recognition:</strong> Received Certificate of Appreciation from Sr. Vice President for model accuracy and work quality</p>
            </div>

            <div class="modal-section">
                <h2>Key Learning</h2>
                <p>Building predictive models requires balancing accuracy with computational efficiency. 95-97% accuracy was sufficient for engineers to make design decisions confidently without physical testing, significantly accelerating R&D cycles.</p>
            </div>
        `
    },

    'hyperhorizon': {
        title: 'Product Management Intern',
        company: 'HyperHorizon',
        date: 'Jan 2024 - Jun 2024',
        tags: ['Market Research', 'GTM Strategy', 'User Research'],
        github: null,
        content: `
            <div class="modal-section">
                <h2>The Challenge</h2>
                <p>HyperHorizon's autonomous underwater vehicle (AUV) was initially defense-focused. My role was to:</p>
                <ul>
                    <li>Expand market beyond defense to NGOs and marine research institutions</li>
                    <li>Make the technology accessible to non-technical users</li>
                    <li>Secure government funding through pitch competitions</li>
                </ul>
            </div>

            <div class="modal-section">
                <h2>What I Did</h2>

                <h3>Market Expansion & Product Strategy</h3>
                <ul>
                    <li>Developed go-to-market strategy targeting marine research and NGO sectors alongside defense</li>
                    <li>Worked on modular system design and HMI (human-machine interface) development for non-technical operators</li>
                    <li>Conducted competitive analysis of 22 market participants</li>
                    <li>Executed market research and documented findings</li>
                </ul>

                <h3>Funding & Competitions</h3>
                <ul>
                    <li>Prepared government tech competition submissions and pitch decks</li>
                    <li>Developed comprehensive business cases with market sizing, technical feasibility analysis, and go-to-market roadmaps</li>
                    <li>Strategized proposals emphasizing risk mitigation and practical deployment paths</li>
                    <li>Secured CAD 100K+ through 4 competition wins</li>
                </ul>

                <h3>Digital Presence & Documentation</h3>
                <ul>
                    <li>Launched HyperHorizon's LinkedIn presence</li>
                    <li>Designed company website</li>
                    <li>Created marketing materials and maintained comprehensive project documentation</li>
                </ul>
            </div>

            <div class="modal-highlight">
                <h3>Impact</h3>
                <ul>
                    <li>Won 4 government startup competitions</li>
                    <li>Secured CAD 100K+ in funding</li>
                    <li>Positioned product for broader market access through usability improvements</li>
                </ul>
            </div>

            <div class="modal-section">
                <h2>Key Learning</h2>
                <p>Product positioning isn't about features—it's about solving the right problem for the right customer. Making technology accessible (through HMI development) opened markets that technical specs alone couldn't reach.</p>
            </div>
        `
    },

    'aesthify': {
        title: 'Aesthify: AI-Powered Design Intelligence',
        company: null,
        date: 'May 2025',
        tags: ['Machine Learning', 'User Research', 'Python'],
        github: 'https://github.com/sanjxksl/Aesthify',
        content: `
            <div class="modal-section">
                <h2>The Problem</h2>
                <p>No structured way to quantify design principles (balance, symmetry, contrast) and connect them to how users actually perceive aesthetics. Designers rely on intuition without systematic understanding of user perception patterns.</p>
            </div>

            <div class="modal-section">
                <h2>What I Built</h2>

                <h3>Technical Framework</h3>
                <ul>
                    <li>YOLOv8 + Roboflow API for object detection in multi-object layouts</li>
                    <li>Rule-based scoring for 7 design principles: Balance, Proportion, Symmetry, Simplicity, Harmony, Contrast, Unity (Gestalt-based)</li>
                    <li>Flask web interface with real-time visualization and bounding box annotations</li>
                    <li>Modular architecture supporting both local (YOLOv8) and cloud (Roboflow) detection</li>
                    <li>Chose rule-based over ML for explainability and grounding in design theory</li>
                </ul>

                <h3>User Study</h3>
                <ul>
                    <li>101 participants rated 8 interior design images (living rooms, bedrooms, study rooms, dining rooms)</li>
                    <li>Collected aesthetic ratings (1-9 scale), emotion tags, style preferences, and demographics</li>
                    <li>Analyzed across age groups, professions, countries, and design style preferences</li>
                </ul>
            </div>

            <div class="modal-highlight">
                <h3>Key Findings</h3>
                <p><strong>Correlation with User Preferences:</strong></p>
                <ul>
                    <li><strong>Simplicity:</strong> r = 0.68 (strongest predictor)</li>
                    <li><strong>Contrast:</strong> r = 0.56</li>
                    <li><strong>Unity:</strong> r = 0.40</li>
                    <li><strong>Symmetry:</strong> r = -0.60 (negative—users rated symmetric layouts lower, challenging traditional design assumptions)</li>
                </ul>

                <p><strong>Demographic Patterns:</strong></p>
                <ul>
                    <li>18-25 year-olds consistently preferred minimalist, modern designs</li>
                    <li>Design/psychology backgrounds gave higher ratings than engineering/medical</li>
                    <li>Significant cultural variation: Netherlands/UAE preferred traditional; India/Canada leaned modern</li>
                </ul>

                <p><strong>Perception Clustering:</strong> Found 3 distinct user groups:</p>
                <ul>
                    <li>Cluster 1 (44%): Calm, Minimalist, Elegant</li>
                    <li>Cluster 0 (31%): Energetic, Elegant, Cozy</li>
                    <li>Cluster 2 (26%): Calm, Elegant, Dull</li>
                </ul>
            </div>

            <div class="modal-section">
                <h2>Impact</h2>
                <ul>
                    <li>Open-sourced on GitHub (sanjxksl/Aesthify)</li>
                    <li>Currently used by design research scholars for data-driven design decisions</li>
                    <li>Proved empirically that aesthetic perception varies significantly by demographics and culture</li>
                </ul>
            </div>

            <div class="modal-section">
                <h2>Key Learning</h2>
                <p>The tool is only valuable because of the user study. Without connecting computation to perception, it's just another aesthetic scorer. The wide variance in ratings for identical layouts proves aesthetics is inherently subjective and culturally shaped.</p>
            </div>
        `
    },

    'us-income': {
        title: 'Income Prediction Neural Network',
        company: null,
        date: 'Oct 2025',
        tags: ['Neural Networks', 'Statistical Modeling', 'Machine Learning Analytics'],
        github: null,
        content: `
            <div class="modal-section">
                <h2>Overview</h2>
                <p>Predicted income from US Census data by systematically testing what actually improved performance versus what just looked sophisticated. Ensembled 5 cross-validation models instead of using one, optimized decision thresholds for class imbalance, and stripped out features that added noise.</p>
            </div>

            <div class="modal-section">
                <h2>Technical Approach</h2>
                <ul>
                    <li>Built 2-layer neural network on Census data</li>
                    <li>Achieved 85.6% accuracy using ensemble of 5 k-fold models</li>
                    <li>Optimized decision thresholds for class imbalance handling</li>
                    <li>Systematic feature selection to reduce noise</li>
                </ul>
            </div>

            <div class="modal-section">
                <h2>Key Learning</h2>
                <p>The process of figuring out what not to do taught me more than the final accuracy. Sometimes removing complexity improves performance.</p>
            </div>
        `
    },

    'alumni-career': {
        title: 'Alumni Career Success Prediction',
        company: null,
        date: 'Nov 2023',
        tags: ['Neural Networks', 'Statistical Modeling', 'Machine Learning Analytics'],
        github: null,
        content: `
            <div class="modal-section">
                <h2>Overview</h2>
                <p>Analyzed 3,300+ alumni records across 4 fragmented datasets to predict career trajectories and identify patterns in career success.</p>
            </div>

            <div class="modal-section">
                <h2>What I Did</h2>

                <h3>Data Cleaning</h3>
                <ul>
                    <li>Merged 4 separate Excel files with inconsistent formats</li>
                    <li>Standardized salary data (USD/INR conversion, monthly/annual normalization, single/double digit → lakhs)</li>
                    <li>Unified job titles using regex and string matching</li>
                    <li>Applied log transformation for better distribution</li>
                </ul>

                <h3>Exploratory Analysis</h3>
                <ul>
                    <li>Salary distribution by country and occupation</li>
                    <li>Career path identification (Industry, Academia, Entrepreneurship)</li>
                    <li>Correlation analysis between geography, designation, and compensation</li>
                </ul>
            </div>

            <div class="modal-highlight">
                <h3>Key Findings</h3>
                <ul>
                    <li>Data scientists and senior software engineers had highest salaries (14-18 LPA median)</li>
                    <li>Geographic mobility matters more than job title—same designation showed 3x salary variance by country</li>
                    <li>Alumni working abroad earned 2-3x more than domestic positions</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>Predictive Modeling</h3>
                <ul>
                    <li>Random Forest for salary prediction using designation, country, years since graduation</li>
                    <li>K-means clustering for career trajectory patterns</li>
                    <li>5-fold cross-validation for model evaluation</li>
                </ul>
            </div>

            <div class="modal-section">
                <p><em>Note: This was an academic exploration. Planning to refine analysis and findings.</em></p>
            </div>
        `
    },

    'summer-home': {
        title: 'Summer Home Recommender',
        company: null,
        date: 'Nov 2024',
        tags: ['Python', 'Recommendation Systems', 'NLP'],
        github: null,
        content: `
            <div class="modal-section">
                <h2>Overview</h2>
                <p>Recommendation system using LLM to extract intent from natural language queries. Scores properties across environment, budget, capacity, amenities, and location with dynamic weighting.</p>
            </div>

            <div class="modal-section">
                <h2>Technical Implementation</h2>
                <ul>
                    <li>LLM-based natural language query processing</li>
                    <li>Multi-dimensional scoring across environment, budget, capacity, amenities, and location</li>
                    <li>Dynamic weighting system for personalized recommendations</li>
                    <li>Built CLI and Streamlit UI for user interaction</li>
                    <li>Handles 100+ properties with CSV export functionality</li>
                </ul>
            </div>

            <div class="modal-section">
                <h2>Features</h2>
                <ul>
                    <li>Natural language input processing</li>
                    <li>Intelligent property matching algorithm</li>
                    <li>User-friendly interfaces (CLI + Streamlit)</li>
                    <li>Export recommendations to CSV</li>
                </ul>
            </div>
        `
    },

    'alumni-affairs': {
        title: 'Alumni Affairs Secretary',
        company: 'IIITDM Kancheepuram',
        date: 'May 2023 - May 2025',
        tags: ['CRM Migration', 'Process Automation', 'Data Analytics'],
        github: null,
        content: `
            <div class="modal-section">
                <h2>Network Building</h2>
                <ul>
                    <li>Connected 2,000+ alumni across 20+ countries, fostering global network</li>
                    <li>Improved data completeness by 14%, collecting data of 1,000+ alumni for NIRF & MoE reporting</li>
                </ul>
            </div>

            <div class="modal-section">
                <h2>Event Organization</h2>
                <ul>
                    <li><strong>2023 Annual Alumni Meet:</strong> 350+ attendees (second-largest in institute history)</li>
                    <li><strong>2024 Annual Alumni Meet:</strong> 550+ attendees (largest ever)</li>
                    <li><strong>Resume 101:</strong> Paired 30+ alumni mentors with 60+ students for resume and career counseling</li>
                </ul>
            </div>

            <div class="modal-section">
                <h2>Institutional Development</h2>
                <ul>
                    <li>Established the Alumni Association</li>
                    <li>Inaugurated the Alumni Office</li>
                    <li>Formed committee to improve placements, securing 5 alumni-mediated career opportunities for students</li>
                </ul>
            </div>

            <div class="modal-section">
                <h2>Operations & Funding</h2>
                <ul>
                    <li>Developed procedure document for alumni fund flow</li>
                    <li>Procured ₹3L+ in funds for student activities through systematic fundraising</li>
                </ul>
            </div>

            <div class="modal-highlight">
                <h3>Impact</h3>
                <p>Grew annual alumni meet from 350 to 550 attendees in one year, established sustainable institutional structures that continue beyond my tenure, and created direct career pathways for students through alumni connections.</p>
            </div>
        `
    },

    'red-ribbon': {
        title: 'Founder, Red Ribbon Society',
        company: 'IIITDM Kancheepuram',
        date: 'Feb 2023 - May 2024',
        tags: ['Community Building', 'Operations', 'Impact'],
        github: null,
        content: `
            <div class="modal-section">
                <h2>Initiative</h2>
                <p>Founded Red Ribbon Society at IIITDM Kancheepuram to promote blood donation and address community health needs.</p>
            </div>

            <div class="modal-section">
                <h2>Execution</h2>
                <ul>
                    <li>Organized first blood donation camp with 161 donors and 9 volunteers</li>
                    <li>Partnered with Indian Voluntary Blood Bank and Rotary Club of Chennai for medical expertise and logistics</li>
                    <li>Successfully conducted three additional camps</li>
                    <li>Built volunteer teams and documented SOPs for continuity</li>
                </ul>
            </div>

            <div class="modal-highlight">
                <h3>Impact</h3>
                <ul>
                    <li>4 total blood donation camps</li>
                    <li>300+ total participants</li>
                    <li>Initiative continues sustainably after my graduation</li>
                    <li>Awarded for voluntary appreciation by Rotary Club of Madras</li>
                </ul>
            </div>

            <div class="modal-section">
                <h2>Key Success Factor</h2>
                <p>Partnerships with established organizations (Blood Bank, Rotary Club) provided credibility, medical expertise, and operational support that enabled administrative approval and sustainable execution.</p>
            </div>
        `
    }
};

// Initialize modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');

    // Function to open modal
    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        // Build modal content
        let html = `
            <div class="modal-header">
                <h1 class="modal-title">${project.title}</h1>
                ${project.company ? `<p class="modal-subtitle">${project.company}</p>` : ''}
                <div class="modal-meta">
                    ${project.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
                </div>
                ${project.github ? `<a href="${project.github}" target="_blank" class="modal-github">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    View on GitHub
                </a>` : ''}
            </div>
            ${project.content}
        `;

        modalBody.innerHTML = html;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for closing modal
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Add click handlers to all work items
    document.querySelectorAll('.work-item, .work-card').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Don't open if clicking on a link
            if (e.target.tagName === 'A') return;

            const projectId = item.getAttribute('data-work') || item.getAttribute('data-project');
            if (projectId) {
                openModal(projectId);
            }
        });

        // Make clickable
        item.style.cursor = 'pointer';
    });
});
