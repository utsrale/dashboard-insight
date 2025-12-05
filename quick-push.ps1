# Quick Git Push Script
# Usage: .\quick-push.ps1 "your commit message"
# Or just: .\quick-push.ps1 (will use auto-generated message)

param(
    [string]$Message = ""
)

# Get current timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"

# Use provided message or auto-generate
if ($Message -eq "") {
    $commitMessage = "Auto update: $timestamp"
} else {
    $commitMessage = "$Message ($timestamp)"
}

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Quick Git Push" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check git status
Write-Host "Checking for changes..." -ForegroundColor Yellow
git status --short

# Ask for confirmation
Write-Host ""
$confirm = Read-Host "Push these changes? (Y/n)"
if ($confirm -eq "" -or $confirm -eq "y" -or $confirm -eq "Y") {
    
    Write-Host ""
    Write-Host "Staging all changes..." -ForegroundColor Green
    git add .
    
    Write-Host "Committing: $commitMessage" -ForegroundColor Green
    git commit -m "$commitMessage"
    
    Write-Host "Pushing to GitHub..." -ForegroundColor Green
    git push origin main
    
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Push cancelled" -ForegroundColor Red
    Write-Host ""
}
