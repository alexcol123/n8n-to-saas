// Simple in-memory store for demo purposes
// In production, use a database like PostgreSQL, MongoDB, etc.

interface Member {
  customerId: string;
  email: string;
  subscriptionId?: string;
  joinedAt: Date;
  status: 'active' | 'cancelled' | 'past_due';
}

class MembersStore {
  private members: Map<string, Member> = new Map();
  private memberCount: number = 0;

  addMember(customerId: string, email: string, subscriptionId?: string): void {
    if (!this.members.has(customerId)) {
      this.memberCount++;
      console.log(`📈 Member count increased: ${this.memberCount - 1} → ${this.memberCount}`);
    }
    
    this.members.set(customerId, {
      customerId,
      email,
      subscriptionId,
      joinedAt: new Date(),
      status: 'active'
    });
  }

  removeMember(customerId: string): void {
    if (this.members.has(customerId)) {
      this.members.delete(customerId);
      this.memberCount--;
      console.log(`📉 Member count decreased: ${this.memberCount + 1} → ${this.memberCount}`);
    }
  }

  updateMemberStatus(customerId: string, status: 'active' | 'cancelled' | 'past_due'): void {
    const member = this.members.get(customerId);
    if (member) {
      member.status = status;
      console.log(`🔄 Member ${customerId} status updated to: ${status}`);
    }
  }

  getMemberCount(): number {
    return this.memberCount;
  }

  getActiveMembers(): number {
    return Array.from(this.members.values()).filter(m => m.status === 'active').length;
  }

  getAllMembers(): Member[] {
    return Array.from(this.members.values());
  }

  getMember(customerId: string): Member | undefined {
    return this.members.get(customerId);
  }

  // Debug method to show current state
  showStats(): void {
    console.log('📊 Current Membership Stats:');
    console.log(`   Total Members: ${this.memberCount}`);
    console.log(`   Active Members: ${this.getActiveMembers()}`);
    console.log(`   Members List:`, this.getAllMembers());
  }
}

// Create a singleton instance
export const membersStore = new MembersStore();