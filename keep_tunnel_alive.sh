#!/bin/bash

# Terminate existing localtunnel processes
pkill -f "localtunnel"
sleep 1

while true; do
  echo "Starting localtunnel..."
  npx --yes localtunnel --port 3000 --subdomain ucomp-survey > tunnel.log 2>&1 &
  TUNNEL_PID=$!
  
  # Wait a few seconds for tunnel to establish
  sleep 5
  
  # Monitor loop
  while true; do
    # Ping the tunnel
    STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" -H "Bypass-Tunnel-Reminder: true" -m 5 https://ucomp-survey.loca.lt || echo "000")
    
    if [ "$STATUS" = "502" ] || [ "$STATUS" = "504" ] || [ "$STATUS" = "000" ] || [ "$STATUS" = "408" ]; then
      echo "Tunnel dropped! (HTTP Status: $STATUS). Restarting..."
      kill -9 $TUNNEL_PID
      pkill -f "localtunnel"
      break
    fi
    
    # Sleep before next check
    sleep 10
  done
  
  sleep 2
done
