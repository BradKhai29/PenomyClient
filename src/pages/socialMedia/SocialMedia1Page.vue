<template>
    <div>Social media</div>
    <div style="max-width: 300px;">

        <GroupCard />
    </div>
    <MemberCard/>
    <MemberCardSkeleton/>
</template>

<script setup>
import GroupCard from 'src/components/common/socialMedia/GroupCard.vue'
import MemberCard from 'src/components/common/socialMedia/MemberCard.vue';
import MemberCardSkeleton from 'src/components/common/socialMedia/MemberCardSkeleton.vue';
</script>