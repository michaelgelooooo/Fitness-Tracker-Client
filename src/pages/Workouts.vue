<script setup>
import { ref, onBeforeMount } from "vue";
import { Notyf } from "notyf";
import api from "../api";
import WorkoutCard from "../components/WorkoutCard.vue";

const notyf = new Notyf();

const workouts = ref([]);
const isLoading = ref(false);

async function getMyWorkouts() {
	isLoading.value = true;

	try {
		const { data } = await api.get("/workouts/getMyWorkouts");

		workouts.value = data.workouts;
	} catch (error) {
		console.error("Get Workouts Error:", error);

		notyf.error("Unable to retrieve your workouts.");
	} finally {
		isLoading.value = false;
	}
}

onBeforeMount(() => {
	getMyWorkouts();
});
</script>

<template>
	<section id="workouts">
		<div class="container py-5">
			<div class="d-flex justify-content-between align-items-center mb-4">
				<div>
					<h2 class="fw-bold mb-1">MY WORKOUTS</h2>
					<p class="text-secondary mb-0">Keep moving. Keep improving.</p>
				</div>

				<router-link :to="{ name: 'Add Workout' }" class="btn btn-primary">
					<i class="bi bi-plus-lg me-1"></i>
					Add Workout
				</router-link>
			</div>

			<div v-if="isLoading" class="text-center py-5">
				<div class="spinner-border text-primary"></div>
				<p class="text-secondary mt-2 mb-0">Loading workouts...</p>
			</div>

			<div v-else-if="workouts.length > 0" class="row g-4">
				<div class="col-md-6 col-lg-4" v-for="workout in workouts" :key="workout._id">
					<WorkoutCard :workoutData="workout" />
				</div>
			</div>

			<div v-else class="text-center py-5">
				<i class="bi bi-clipboard-x display-4 text-secondary"></i>
				<h5 class="fw-bold mt-3">No Workouts Yet</h5>
				<p class="text-secondary">Start by adding your first workout.</p>
			</div>
		</div>
	</section>
</template>

<style scoped>
#workouts {
	min-height: 95vh;
}
</style>
