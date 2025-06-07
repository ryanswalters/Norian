from dataclasses import dataclass
from datetime import datetime
import heapq
from typing import Callable, Any, List

@dataclass(order=True)
class ScheduledJob:
    run_at: datetime
    callback: Callable[..., Any]
    payload: Any

_queue: List[ScheduledJob] = []


def schedule(run_at: datetime, callback: Callable[..., Any], payload: Any):
    heapq.heappush(_queue, ScheduledJob(run_at, callback, payload))


def run_pending(now: datetime):
    while _queue and _queue[0].run_at <= now:
        job = heapq.heappop(_queue)
        job.callback(job.payload)
