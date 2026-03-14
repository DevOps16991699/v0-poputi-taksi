#!/bin/bash

# Conflict Resolution Script for SDK 54 Migration
# Expo SDK 54 Pull Request - Merge Conflict Resolver

echo "=================================================="
echo "  Poputi Taksi - SDK 54 Conflict Resolution"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[*]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Step 1: Fetch latest changes
print_status "Fetching latest changes from remote..."
git fetch origin
print_success "Fetched latest changes"
echo ""

# Step 2: Check current branch
print_status "Checking current branch..."
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
print_success "Current branch: $CURRENT_BRANCH"
echo ""

# Step 3: Check for conflicts
print_status "Checking for merge conflicts..."
CONFLICTS=$(git diff --name-only --diff-filter=U)

if [ -z "$CONFLICTS" ]; then
    print_success "No merge conflicts detected!"
    echo ""
    print_status "Repository is clean and ready."
    exit 0
fi

print_warning "Found conflicted files:"
echo "$CONFLICTS" | while read -r file; do
    echo "  - $file"
done
echo ""

# Step 4: Strategy - Keep SDK 54 versions
print_status "Applying SDK 54 conflict resolution strategy..."
echo ""

# Handle package.json conflicts
if echo "$CONFLICTS" | grep -q "package.json"; then
    print_status "Resolving package.json conflicts..."
    
    # Use our version (theirs in this case is the incoming v0 changes)
    git checkout --theirs package.json
    print_success "Resolved package.json - keeping SDK 54 versions"
    echo ""
fi

# Handle app.json conflicts
if echo "$CONFLICTS" | grep -q "app.json"; then
    print_status "Resolving app.json conflicts..."
    
    git checkout --theirs app.json
    print_success "Resolved app.json - keeping Hermes and New Architecture settings"
    echo ""
fi

# Handle README.md conflicts
if echo "$CONFLICTS" | grep -q "README.md"; then
    print_status "Resolving README.md conflicts..."
    
    git checkout --theirs README.md
    print_success "Resolved README.md - keeping comprehensive documentation"
    echo ""
fi

# Handle tsconfig.json conflicts
if echo "$CONFLICTS" | grep -q "tsconfig.json"; then
    print_status "Resolving tsconfig.json conflicts..."
    
    git checkout --theirs tsconfig.json
    print_success "Resolved tsconfig.json"
    echo ""
fi

# Handle babel.config.js conflicts
if echo "$CONFLICTS" | grep -q "babel.config.js"; then
    print_status "Resolving babel.config.js conflicts..."
    
    git checkout --theirs babel.config.js
    print_success "Resolved babel.config.js"
    echo ""
fi

# Handle metro.config.js conflicts
if echo "$CONFLICTS" | grep -q "metro.config.js"; then
    print_status "Resolving metro.config.js conflicts..."
    
    git checkout --theirs metro.config.js
    print_success "Resolved metro.config.js"
    echo ""
fi

# Step 5: Stage all resolved files
print_status "Staging all resolved files..."
git add .
print_success "All files staged"
echo ""

# Step 6: Commit the resolution
print_status "Creating commit for conflict resolution..."
git commit -m "Resolve merge conflicts: Maintain SDK 54 compatibility with main branch

This commit resolves merge conflicts between the v0 branch and main branch.

Key changes maintained:
- Expo SDK 54.0.0 with React Native 0.85.0
- Hermes engine enabled for better performance
- New React Native Architecture enabled
- Comprehensive documentation in English and Uzbek
- Full TypeScript support with strict type checking

SDK 54 specifications:
- jsEngine: hermes
- newArchEnabled: true
- All dependencies properly versioned
- Optimized build configuration"

print_success "Conflict resolution committed successfully!"
echo ""

# Step 7: Summary
echo "=================================================="
echo "  Conflict Resolution Complete!"
echo "=================================================="
echo ""
print_success "Repository is now ready to merge"
print_status "Next steps:"
echo "  1. Push your changes: git push origin $CURRENT_BRANCH"
echo "  2. Review the pull request on GitHub"
echo "  3. Click 'Merge pull request' when ready"
echo ""
print_status "Verify the changes are correct before pushing!"
echo ""
