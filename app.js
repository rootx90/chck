import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [checklist, setChecklist] = useState(() => {
        const savedChecklist = localStorage.getItem('checklist');
        return savedChecklist ? JSON.parse(savedChecklist) : [
            {
                category: "Input Validation Vulnerabilities",
                items: [
                    { name: "SQL Injection", subitems: ["Union-based", "Error-based", "Blind (Boolean & Time-based)", "Out-of-band (OOB)"], checked: false },
                    { name: "Cross-Site Scripting (XSS)", subitems: ["Reflected", "Stored", "DOM-based"], checked: false },
                    { name: "Command Injection", subitems: ["OS command injection", "Path traversal"], checked: false },
                    { name: "LDAP Injection", subitems: [], checked: false },
                    { name: "XML External Entity (XXE)", subitems: ["In-band (Data leakage)", "Out-of-band (SSRF-like behaviors)"], checked: false }
                ]
            },
            {
                category: "Authentication & Authorization Issues",
                items: [
                    { name: "Broken Authentication", subitems: ["Credential stuffing", "Default credentials", "Password reset flaws"], checked: false },
                    { name: "Session Management", subitems: ["Session fixation", "Missing Secure/HTTPOnly flags", "Predictable session IDs"], checked: false },
                    { name: "Authorization Flaws", subitems: ["IDOR (Insecure Direct Object References)", "Privilege escalation (Vertical/Horizontal)", "Access control bypass (ACL misconfigurations)"], checked: false }
                ]
            },
            {
                category: "Business Logic Vulnerabilities",
                items: [
                    { name: "Skipping validation steps", subitems: [], checked: false },
                    { name: "Circumventing multi-step processes", subitems: [], checked: false },
                    { name: "Exploiting workflow dependencies", subitems: [], checked: false },
                    { name: "Abuse of rate limits or quotas", subitems: [], checked: false }
                ]
            },
            {
                category: "File Upload & Handling",
                items: [
                    { name: "Unrestricted File Upload", subitems: ["Executable payloads", "Image-based attacks (Polyglot files)"], checked: false },
                    { name: "File Inclusion", subitems: ["Local File Inclusion (LFI)", "Remote File Inclusion (RFI)"], checked: false }
                ]
            },
            {
                category: "Security Misconfigurations",
                items: [
                    { name: "Exposed administrative interfaces", subitems: [], checked: false },
                    { name: "Default configurations", subitems: [], checked: false },
                    { name: "Missing security headers", subitems: ["CSP (Content Security Policy)", "HSTS (HTTP Strict Transport Security)"], checked: false },
                    { name: "Open ports/services", subitems: [], checked: false }
                ]
            },
            {
                category: "Cryptographic Vulnerabilities",
                items: [
                    { name: "Weak encryption algorithms", subitems: [], checked: false },
                    { name: "Hardcoded secrets", subitems: [], checked: false },
                    { name: "Insecure key storage", subitems: [], checked: false },
                    { name: "Padding oracle attacks", subitems: [], checked: false }
                ]
            },
            {
                category: "Server-Side Issues",
                items: [
                    { name: "Server-Side Request Forgery (SSRF)", subitems: ["Internal network scans", "Cloud metadata access"], checked: false },
                    { name: "Deserialization Flaws", subitems: ["Insecure object deserialization", "Remote code execution (RCE)"], checked: false },
                    { name: "Memory Vulnerabilities", subitems: ["Buffer overflows", "Race conditions"], checked: false }
                ]
            },
            {
                category: "Client-Side Vulnerabilities",
                items: [
                    { name: "Cross-Site Request Forgery (CSRF)", subitems: [], checked: false },
                    { name: "Clickjacking", subitems: [], checked: false },
                    { name: "DOM Manipulation", subitems: ["DOM XSS", "Client-side template injection"], checked: false }
                ]
            },
            {
                category: "Third-Party and API Vulnerabilities",
                items: [
                    { name: "Exposed APIs", subitems: ["Lack of authentication", "Excessive data exposure", "Rate-limit bypass"], checked: false },
                    { name: "Dependency vulnerabilities", subitems: ["Outdated libraries", "Known CVEs in components"], checked: false }
                ]
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('checklist', JSON.stringify(checklist));
    }, [checklist]);

    const toggleItem = (categoryIndex, itemIndex, subitemIndex) => {
        setChecklist(prevChecklist => {
            const newChecklist = [...prevChecklist];
            if (subitemIndex !== null) {
                newChecklist[categoryIndex].items[itemIndex].subitems[subitemIndex] = {
                    ...newChecklist[categoryIndex].items[itemIndex].subitems[subitemIndex],
                    checked: !newChecklist[categoryIndex].items[itemIndex].subitems[subitemIndex].checked
                };
            } else {
                newChecklist[categoryIndex].items[itemIndex] = {
                    ...newChecklist[categoryIndex].items[itemIndex],
                    checked: !newChecklist[categoryIndex].items[itemIndex].checked
                };
            }
            return newChecklist;
        });
    };

    return (
        <div className="App">
            <h1 className="mt-4 mb-4">Code Vulnerability Types for Feature Testing Checklist</h1>
            {checklist.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-4">
                    <h2>{category.category}</h2>
                    <ul>
                        {category.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => toggleItem(categoryIndex, itemIndex, null)}
                                />
                                {item.name}
                                {item.subitems.length > 0 && (
                                    <ul>
                                        {item.subitems.map((subitem, subitemIndex) => (
                                            <li key={subitemIndex}>
                                                <input
                                                    type="checkbox"
                                                    checked={subitem.checked}
                                                    onChange={() => toggleItem(categoryIndex, itemIndex, subitemIndex)}
                                                />
                                                {subitem}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default App;