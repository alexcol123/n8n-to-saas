import { NextResponse } from 'next/server';
import { membersStore } from '@/lib/members-store';

export async function GET() {
  const stats = {
    totalMembers: membersStore.getMemberCount(),
    activeMembers: membersStore.getActiveMembers(),
    allMembers: membersStore.getAllMembers(),
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(stats);
}