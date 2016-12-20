<?php
    /*
        * Config for PayPal specific values
    */
    // CUENTA PEPE@PARATODOHAYFANS.COM
    //Whether Sandbox environment is being used, Keep it true for testing
    define("SANDBOX_FLAG", true);

    //PayPal REST API endpoints
    define("SANDBOX_ENDPOINT", "https://api.sandbox.paypal.com");
    define("LIVE_ENDPOINT", "https://api.paypal.com");

    //Merchant ID
    define("MERCHANT_ID","RHZN38B7X9FL8"); // Sandbox
    // define("MERCHANT_ID","2YSP5C8B6QBEY"); // Produccion

    //PayPal REST App SANDBOX Client Id and Client Secret
    define("SANDBOX_CLIENT_ID" , "AZ_yEN28k2NFLtfpvX0VcU7mxTVKioAxC3Lxt6jzkNQH8hHIeR4JzXfgRTx7i6KyPDO7crvcqUbBgNtU");
    define("SANDBOX_CLIENT_SECRET", "EGCm9JocifrHqT665ImmHlwYQSR8ARFDfCJ476lCV2HZwnnFC8L8yVwmLAR9_WTTaGchC36t9RdmYssI");

    //Environments -Sandbox and Production/Live
    define("SANDBOX_ENV", "sandbox");
    define("LIVE_ENV", "production");

    //PayPal REST App SANDBOX Client Id and Client Secret
    define("LIVE_CLIENT_ID" , "ATubReZmmDH6SPrwXMwUlZYf9U3Nd1oheyodclcZ7NHFqiz3Uqn854kCP3JmRq5luDHKCwfeHGq3wa4H");
    define("LIVE_CLIENT_SECRET" , "EAa7c6rzqz6vSlJk8Yf5OLpwvSw-FwxAkQUSr-paUg8d0hwQTqV1kBAnP-Wi9UFSZJsNr8LMgLiAU9_T");

    //ButtonSource Tracker Code
    define("SBN_CODE","PP-DemoPortal-EC-IC-php-REST");

?>