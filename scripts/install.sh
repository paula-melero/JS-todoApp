#!/bin/bash
$APP=/home/todoapp
if [ -f "$APP" ]; then
    rm -rf "$APP"
fi

