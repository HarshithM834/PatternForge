import os
import re

def replace_in_file(path, replacements):
    with open(path, 'r') as f:
        content = f.read()
    
    for search, replace in replacements:
        content = re.sub(search, replace, content)
        
    with open(path, 'w') as f:
        f.write(content)

base = "/Users/harshithmotipalli/Documents/Projects/DSA/src"

# index.css
replace_in_file(f"{base}/index.css", [
    (r"--bg-deep-charcoal: #121417;", "--bg-deep-charcoal: #F8FAFC;"),
    (r"--bg-panel: #1A1D21;", "--bg-panel: #FFFFFF;"),
    (r"--bg-panel-hover: #22262B;", "--bg-panel-hover: #F1F5F9;"),
    (r"--text-off-white: #E4E7EB;", "--text-off-white: #1E293B;"),
    (r"--text-muted: #9BA1A6;", "--text-muted: #64748B;"),
    (r"--accent-cyan: #00F0FF;", "--accent-cyan: #6366F1;"),
    (r"--accent-cyan-dim: rgba\(0, 240, 255, 0.15\);", "--accent-cyan-dim: rgba(99, 102, 241, 0.15);"),
    (r"--border-subtle: #2D3139;", "--border-subtle: #E2E8F0;"),
    (r"rgba\(255,255,255,0.02\)", "rgba(0,0,0,0.03)"),
    (r"color: #000; /\* primary-btn \*/", "color: #ffffff;"),
    (r"color: #000;", "color: #ffffff;")
])

# CompletionCard
replace_in_file(f"{base}/components/CompletionCard.module.css", [
    (r"color: #fff;", "color: var(--text-off-white);"),
    (r"rgba\(0, 240, 255, 0.1\)", "var(--accent-cyan-dim)"),
    (r"rgba\(0, 0, 0, 0.5\)", "rgba(0, 0, 0, 0.08)")
])

# CodeEditor
replace_in_file(f"{base}/components/CodeEditor.module.css", [
    (r"background-color: #0d0f12;", "background-color: #F1F5F9;"),
    (r"color: #e6e6e6;", "color: #334155;")
])

# GlossaryTerm
replace_in_file(f"{base}/components/GlossaryTerm.module.css", [
    (r"color: #fff;", "color: var(--text-off-white);"),
    (r"rgba\(0, 240, 255, 0.1\)", "var(--accent-cyan-dim)"),
    (r"rgba\(0, 240, 255, 0.2\)", "rgba(99, 102, 241, 0.2)"),
    (r"rgba\(0, 0, 0, 0.5\)", "rgba(0, 0, 0, 0.1)")
])

# ReflectionForm
replace_in_file(f"{base}/components/ReflectionForm.module.css", [
    (r"color: #fff;", "color: var(--text-off-white);"),
    (r"rgba\(0, 0, 0, 0.2\)", "rgba(0, 0, 0, 0.03)")
])

# CodeFillBlank
replace_in_file(f"{base}/components/CodeFillBlank.module.css", [
    (r"background-color: #0d0f12;", "background-color: #F1F5F9;"),
    (r"color: #e6e6e6;", "color: #334155;"),
    (r"rgba\(255, 255, 255, 0.1\)", "rgba(0, 0, 0, 0.04)"),
    (r"rgba\(255, 255, 255, 0.3\)", "rgba(0, 0, 0, 0.15)"),
    (r"rgba\(0, 240, 255, 0.1\)", "var(--accent-cyan-dim)")
])

# LessonPage
replace_in_file(f"{base}/pages/LessonPage.module.css", [
    (r"color: #fff;", "color: var(--text-off-white);"),
    (r"background-color: #0d0f12;", "background-color: #F1F5F9;"),
    (r"rgba\(255, 255, 255, 0.02\)", "rgba(0, 0, 0, 0.02)")
])

# LandingPage
replace_in_file(f"{base}/pages/LandingPage.module.css", [
    (r"color: #fff;", "color: var(--text-off-white);"),
    (r"rgba\(0, 0, 0, 0.4\)", "rgba(0, 0, 0, 0.08)"),
    (r"rgba\(0, 240, 255, 0.2\)", "rgba(99, 102, 241, 0.2)")
])

# MultipleChoiceQuestion
replace_in_file(f"{base}/components/MultipleChoiceQuestion.module.css", [
    (r"rgba\(255, 255, 255, 0.03\)", "rgba(0, 0, 0, 0.02)"),
    (r"rgba\(255, 255, 255, 0.08\)", "rgba(0, 0, 0, 0.05)"),
    (r"rgba\(255, 255, 255, 0.1\)", "rgba(0, 0, 0, 0.08)")
])

# HintDrawer
replace_in_file(f"{base}/components/HintDrawer.module.css", [
    (r"rgba\(0, 0, 0, 0.1\)", "rgba(0, 0, 0, 0.03)"),
    (r"rgba\(0, 240, 255, 0.05\)", "var(--accent-cyan-dim)")
])

print("Theme update script finished.")
