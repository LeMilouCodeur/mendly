#!/usr/bin/env python3
"""
Backend API Testing for Mendly Landing Page Email Subscription System
Tests all email subscription endpoints and database operations
"""

import requests
import json
import time
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE_URL = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE_URL}")

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.session = requests.Session()
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'details': details
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details:
            print(f"   Details: {details}")
    
    def test_api_health(self):
        """Test basic API connectivity"""
        try:
            response = self.session.get(f"{API_BASE_URL}/")
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.log_test("API Health Check", True, "API is responding correctly")
                    return True
                else:
                    self.log_test("API Health Check", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("API Health Check", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("API Health Check", False, f"Connection error: {str(e)}")
            return False
    
    def test_email_subscription_valid(self):
        """Test email subscription with valid email"""
        test_email = f"test.user.{int(time.time())}@mendly.com"
        payload = {
            "email": test_email,
            "source": "hero"
        }
        
        try:
            response = self.session.post(
                f"{API_BASE_URL}/email-subscription",
                json=payload,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'succès' in data.get('message', '').lower():
                    self.log_test("Valid Email Subscription", True, f"Successfully subscribed {test_email}")
                    return test_email
                else:
                    self.log_test("Valid Email Subscription", False, f"Unexpected response: {data}")
                    return None
            else:
                self.log_test("Valid Email Subscription", False, f"HTTP {response.status_code}: {response.text}")
                return None
        except Exception as e:
            self.log_test("Valid Email Subscription", False, f"Request error: {str(e)}")
            return None
    
    def test_email_subscription_duplicate(self, existing_email):
        """Test email subscription with duplicate email"""
        if not existing_email:
            self.log_test("Duplicate Email Test", False, "No existing email to test with")
            return
            
        payload = {
            "email": existing_email,
            "source": "final-cta"
        }
        
        try:
            response = self.session.post(
                f"{API_BASE_URL}/email-subscription",
                json=payload,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 400:
                data = response.json()
                if 'déjà enregistré' in data.get('detail', '').lower():
                    self.log_test("Duplicate Email Test", True, "Correctly rejected duplicate email")
                else:
                    self.log_test("Duplicate Email Test", False, f"Wrong error message: {data}")
            else:
                self.log_test("Duplicate Email Test", False, f"Expected 400, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Duplicate Email Test", False, f"Request error: {str(e)}")
    
    def test_email_subscription_invalid_format(self):
        """Test email subscription with invalid email format"""
        invalid_emails = [
            "invalid-email",
            "test@",
            "@domain.com",
            "test..test@domain.com",
            "test@domain",
            ""
        ]
        
        for invalid_email in invalid_emails:
            payload = {
                "email": invalid_email,
                "source": "hero"
            }
            
            try:
                response = self.session.post(
                    f"{API_BASE_URL}/email-subscription",
                    json=payload,
                    headers={'Content-Type': 'application/json'}
                )
                
                if response.status_code == 422:
                    self.log_test(f"Invalid Email Format ({invalid_email})", True, "Correctly rejected invalid email format")
                else:
                    self.log_test(f"Invalid Email Format ({invalid_email})", False, f"Expected 422, got {response.status_code}")
            except Exception as e:
                self.log_test(f"Invalid Email Format ({invalid_email})", False, f"Request error: {str(e)}")
    
    def test_email_subscription_edge_cases(self):
        """Test edge cases for email subscription"""
        # Empty email field
        try:
            response = self.session.post(
                f"{API_BASE_URL}/email-subscription",
                json={"source": "hero"},
                headers={'Content-Type': 'application/json'}
            )
            if response.status_code == 422:
                self.log_test("Empty Email Field", True, "Correctly rejected empty email")
            else:
                self.log_test("Empty Email Field", False, f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_test("Empty Email Field", False, f"Request error: {str(e)}")
        
        # Very long email
        long_email = "a" * 100 + "@" + "b" * 100 + ".com"
        try:
            response = self.session.post(
                f"{API_BASE_URL}/email-subscription",
                json={"email": long_email, "source": "hero"},
                headers={'Content-Type': 'application/json'}
            )
            # Should either accept or reject with proper error
            if response.status_code in [200, 422]:
                self.log_test("Very Long Email", True, f"Handled long email appropriately: {response.status_code}")
            else:
                self.log_test("Very Long Email", False, f"Unexpected status: {response.status_code}")
        except Exception as e:
            self.log_test("Very Long Email", False, f"Request error: {str(e)}")
        
        # Special characters in email
        special_email = f"test+special.{int(time.time())}@mendly-test.co.uk"
        try:
            response = self.session.post(
                f"{API_BASE_URL}/email-subscription",
                json={"email": special_email, "source": "hero"},
                headers={'Content-Type': 'application/json'}
            )
            if response.status_code == 200:
                self.log_test("Special Characters Email", True, "Accepted valid email with special characters")
            else:
                self.log_test("Special Characters Email", False, f"Rejected valid email: {response.status_code}")
        except Exception as e:
            self.log_test("Special Characters Email", False, f"Request error: {str(e)}")
    
    def test_email_retrieval(self):
        """Test email subscriptions retrieval endpoint"""
        try:
            response = self.session.get(f"{API_BASE_URL}/email-subscriptions")
            
            if response.status_code == 200:
                data = response.json()
                if 'subscriptions' in data and 'total' in data:
                    subscriptions = data['subscriptions']
                    total = data['total']
                    
                    if len(subscriptions) == total:
                        # Check structure of first subscription if any exist
                        if subscriptions:
                            first_sub = subscriptions[0]
                            required_fields = ['id', 'email', 'source', 'timestamp']
                            missing_fields = [field for field in required_fields if field not in first_sub]
                            
                            if not missing_fields:
                                self.log_test("Email Retrieval", True, f"Retrieved {total} subscriptions with correct structure")
                            else:
                                self.log_test("Email Retrieval", False, f"Missing fields: {missing_fields}")
                        else:
                            self.log_test("Email Retrieval", True, "Retrieved empty list correctly")
                    else:
                        self.log_test("Email Retrieval", False, f"Count mismatch: {len(subscriptions)} vs {total}")
                else:
                    self.log_test("Email Retrieval", False, f"Missing required fields in response: {data}")
            else:
                self.log_test("Email Retrieval", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Email Retrieval", False, f"Request error: {str(e)}")
    
    def test_source_field_capture(self):
        """Test that source field is properly captured"""
        sources = ["hero", "final-cta", "unknown"]
        
        for source in sources:
            test_email = f"source.test.{source}.{int(time.time())}@mendly.com"
            payload = {
                "email": test_email,
                "source": source
            }
            
            try:
                response = self.session.post(
                    f"{API_BASE_URL}/email-subscription",
                    json=payload,
                    headers={'Content-Type': 'application/json'}
                )
                
                if response.status_code == 200:
                    # Verify the source was captured by checking the retrieval endpoint
                    time.sleep(0.1)  # Small delay to ensure data is persisted
                    retrieval_response = self.session.get(f"{API_BASE_URL}/email-subscriptions")
                    
                    if retrieval_response.status_code == 200:
                        data = retrieval_response.json()
                        subscriptions = data.get('subscriptions', [])
                        
                        # Find our test email
                        found_subscription = None
                        for sub in subscriptions:
                            if sub.get('email') == test_email:
                                found_subscription = sub
                                break
                        
                        if found_subscription and found_subscription.get('source') == source:
                            self.log_test(f"Source Field Capture ({source})", True, f"Source '{source}' captured correctly")
                        else:
                            self.log_test(f"Source Field Capture ({source})", False, f"Source not captured correctly: {found_subscription}")
                    else:
                        self.log_test(f"Source Field Capture ({source})", False, "Could not verify source capture")
                else:
                    self.log_test(f"Source Field Capture ({source})", False, f"Failed to create subscription: {response.status_code}")
            except Exception as e:
                self.log_test(f"Source Field Capture ({source})", False, f"Request error: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("MENDLY BACKEND API TESTING")
        print("=" * 60)
        
        # Test API health first
        if not self.test_api_health():
            print("❌ API is not accessible. Stopping tests.")
            return self.test_results
        
        print("\n--- Email Subscription Tests ---")
        
        # Test valid email subscription
        test_email = self.test_email_subscription_valid()
        
        # Test duplicate email
        self.test_email_subscription_duplicate(test_email)
        
        # Test invalid email formats
        self.test_email_subscription_invalid_format()
        
        # Test edge cases
        self.test_email_subscription_edge_cases()
        
        print("\n--- Email Retrieval Tests ---")
        
        # Test email retrieval
        self.test_email_retrieval()
        
        print("\n--- Source Field Tests ---")
        
        # Test source field capture
        self.test_source_field_capture()
        
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r['success']])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\nFailed Tests:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['message']}")
        
        return self.test_results

if __name__ == "__main__":
    tester = BackendTester()
    results = tester.run_all_tests()